import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';
import { Web3Service } from '../../util/web3.service';

import { Image } from './image.model';
import { ImageService } from './image.service';
import { Principal, ResponseWrapper } from '../../shared';
import { PendingTransaction } from '../pending-transaction/pending-transaction.model';
import { PendingTransactionService } from '../pending-transaction/pending-transaction.service';

@Component({
    selector: 'jhi-display-image',
    templateUrl: './display-image.component.html',
    styleUrls: [
        'album.css'
    ]
})
export class DisplayImageComponent implements OnInit, OnDestroy {
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
    balance: '',
    account: ''
    }

    constructor(
        private imageService: ImageService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private web3Service: Web3Service,
        private pendingTransactionService: PendingTransactionService,
        private eventManager: JhiEventManager
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
        this.watchAccount();
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

        const blob = new Blob([event.target.files[0]], { type: 'image/jpeg'});
        const blobUrl = URL.createObjectURL(blob);

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event:any) => { // called once readAsDataURL is completed
            this.url = event.target.result;
        try {
            localStorage.setItem('filething', this.uploadedImage);
        }
        catch (e) {
            console.log('Storage failed: ' + e);
        }
      }
    }
  }

  submitImage(event) {
    console.log('in submitImage() attempting to upload image:' + this.uploadedImage);

    const imageModel = new Image(null, 'abc', 'img/location.jpg', 1, this.url);

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

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.ethereumModel.account = accounts[0];
      this.refreshBalance();
    });
  }

    refreshBalance() {
    let that = this;
    console.log('Refreshing balance');
    try {
      this.web3Service.getEthBalance(this.ethereumModel.account, function (data) {
        that.ethereumModel.balance = data;
    });
    } catch (e) {
      console.log(e);
    }
  }

    vote(imageId) {
        this.imageService.find(imageId).subscribe((img) => {
            if (img) {
                const sender = this.ethereumModel.account;
                const receiver = img.crypto_user;
                const imageId = img.id;
                let that = this;
                this.web3Service.sendEth(sender,receiver, function(newTransactionHash) {
                    let newPendingTransaction = new PendingTransaction(null, sender, receiver, 1, newTransactionHash, imageId);
                    that.subscribeToCreatePendingTransaction(
                        that.pendingTransactionService.create(newPendingTransaction)
                    );
                });
            }
        });
    }

    private subscribeToCreatePendingTransaction(result: Observable<PendingTransaction>) {
        result.subscribe((res: PendingTransaction) =>
            this.onSavePendingTransactionSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSavePendingTransactionSuccess(result: PendingTransaction) {
        this.eventManager.broadcast({ name: 'pendingTransactionModification', content: 'OK'});
    }
}
