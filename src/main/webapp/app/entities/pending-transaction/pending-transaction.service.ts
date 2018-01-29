import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PendingTransaction } from './pending-transaction.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PendingTransactionService {

    private resourceUrl = SERVER_API_URL + 'api/pending-transactions';

    constructor(private http: Http) { }

    create(pendingTransaction: PendingTransaction): Observable<PendingTransaction> {
        const copy = this.convert(pendingTransaction);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pendingTransaction: PendingTransaction): Observable<PendingTransaction> {
        const copy = this.convert(pendingTransaction);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PendingTransaction> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to PendingTransaction.
     */
    private convertItemFromServer(json: any): PendingTransaction {
        const entity: PendingTransaction = Object.assign(new PendingTransaction(), json);
        return entity;
    }

    /**
     * Convert a PendingTransaction to a JSON which can be sent to the server.
     */
    private convert(pendingTransaction: PendingTransaction): PendingTransaction {
        const copy: PendingTransaction = Object.assign({}, pendingTransaction);
        return copy;
    }
}
