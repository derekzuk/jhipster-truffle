import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ImageUpload } from './img-upload.model';
import { ResponseWrapper } from '../shared/model/response-wrapper.model';
import { createRequestOption } from '../shared/model/request-util';

@Injectable()
export class ImageUploadService {

    constructor(private http: Http) { }

    saveImage(image: any): Observable<any> {
        return this.http.post('api/saveImage', image);
    }
}
