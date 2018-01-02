import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';

import { Image } from './image.model';
import { ImageService } from './image.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-image',
    templateUrl: './image.component.html'
})
export class ImageComponent implements OnInit, OnDestroy {
images: Image[];
    currentAccount: any;
    eventSubscriber: Subscription;
      url = require('../../../content/images/rainbowskele.jpg');
      uploadedImage;

    constructor(
        private imageService: ImageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.imageService.query().subscribe(
            (res: ResponseWrapper) => {
                this.images = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInImages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Image) {
        return item.id;
    }
    registerChangeInImages() {
        this.eventSubscriber = this.eventManager.subscribe('imageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        this.uploadedImage = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  submitImage(event) {
    console.log('in submitImage() attempting to upload image:' + this.uploadedImage);
    console.log(this.uploadedImage);

    const imageModel = new Image(null, 'abc', 'img/location.jpg', 1);

    this.subscribeToSaveResponse(
        this.imageService.create(imageModel));
  }


    private subscribeToSaveResponse(result: Observable<Image>) {
        result.subscribe((res: Image) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Image) {
        this.eventManager.broadcast({ name: 'imageListModification', content: 'OK'});
    }

    private onSaveError() {
    }
}
