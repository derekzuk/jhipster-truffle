import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';

import { Image } from '../image.model';
import { ImageService } from '../image.service';
import { Principal, ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-image',
    templateUrl: '../image.component.html'
})
export class ImageComponent implements OnInit, OnDestroy {
    images: Image[];
    currentAccount: any;
    eventSubscriber: Subscription;
    displayImages;

    constructor(
        private imageService: ImageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        console.log("attemping loadAll() query");
        this.imageService.query().subscribe(
            (res: ResponseWrapper) => {
                this.images = res.json;
                console.log("this.images: " + this.images);
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

    private getImages() {
        this.displayImages = this.imageService.query();
        console.log("displayImages: " + this.displayImages);
    }


}
