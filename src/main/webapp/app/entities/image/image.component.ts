import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';
import {Web3Service} from '../../util/web3.service';

import { Image } from './image.model';
import { ImageService } from './image.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-image',
    templateUrl: './image.component.html'
})
export class ImageComponent implements OnInit, OnDestroy {
    accounts: string[];
    images: Image[];
    currentAccount: any;
    eventSubscriber: Subscription;
    url = require('../../../content/images/rainbowskele.jpg');
    imageBlob;
    uploadedImage;

  ethereumModel = {
    amount: 0,
    receiver: '',
    balance: 0,
    account: ''
    }

    constructor(
        private imageService: ImageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private web3Service: Web3Service
    ) {
    }

    loadAll() {
        this.imageService.query().subscribe(
            (res: ResponseWrapper) => {
                this.images = res.json;
                console.log("this.images: " + this.images);
                console.log(this.images[0]);
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
        this.watchAccount();
    }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.ethereumModel.account = accounts[0];
      this.refreshBalance();
    });
  }

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      this.ethereumModel.balance = await this.web3Service.getEthBalance(this.ethereumModel.account);
    } catch (e) {
      console.log(e);
    }
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

        console.log('event.target.files[0]:' + event.target.files[0]);

        const blob = new Blob([event.target.files[0]], { type: 'image/jpeg'});
        console.log('blob:' + blob);
        const blobUrl = URL.createObjectURL(blob);
        console.log('blobUrl: ' + blobUrl);

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event:any) => { // called once readAsDataURL is completed
            this.url = event.target.result;
        try {
            localStorage.setItem('filething', this.uploadedImage);
            console.log('file saved successfully?');
        }
        catch (e) {
            console.log('Storage failed: ' + e);
        }
      }
    }
  }

  submitImage(event) {
    console.log('in submitImage() attempting to upload image:' + this.uploadedImage);
    console.log(this.uploadedImage);

    const imageModel = new Image(null, this.ethereumModel.account, 'img/location.jpg', 1, this.url);

    console.log('imageModel: ' + imageModel);

    this.subscribeToSaveResponse(
        this.imageService.create(imageModel)
    );
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
