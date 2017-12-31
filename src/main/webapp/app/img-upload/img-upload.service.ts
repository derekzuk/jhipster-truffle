import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SERVER_API_URL } from '../app.constants';
import { ImageUpload } from './img-upload.model';
import { ResponseWrapper, createRequestOption } from '../shared';

@Injectable()
export class ImageUploadService {
    private resourceUrl = SERVER_API_URL + 'api/images';

    constructor(private http: Http) { }

    saveImage(image: ImageUpload): Observable<ResponseWrapper> {
        console.log('in saveImage in the service class');
        console.log(image);

        return this.http.post(this.resourceUrl + '/saveImage', image)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    getTest() {
        console.log('in get test');
        return this.http.get('api/getTest');
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

}
