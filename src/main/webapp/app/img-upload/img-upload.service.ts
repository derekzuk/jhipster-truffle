import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ImageUpload } from './img-upload.model';
import { ResponseWrapper } from '../shared/model/response-wrapper.model';
import { createRequestOption } from '../shared/model/request-util';

@Injectable()
export class ImageUploadService {

    constructor(private http: Http) { }

    saveImage(image: ImageUpload): Observable<ResponseWrapper> {
        console.log("in saveImage in the service class");

        this.http.post('api/saveImage', image);

        return this.http.post('api/saveImage', image)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
}
