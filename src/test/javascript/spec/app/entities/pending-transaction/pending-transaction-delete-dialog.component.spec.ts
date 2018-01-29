/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Jhiptruffle2TestModule } from '../../../test.module';
import { PendingTransactionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction-delete-dialog.component';
import { PendingTransactionService } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction.service';

describe('Component Tests', () => {

    describe('PendingTransaction Management Delete Component', () => {
        let comp: PendingTransactionDeleteDialogComponent;
        let fixture: ComponentFixture<PendingTransactionDeleteDialogComponent>;
        let service: PendingTransactionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Jhiptruffle2TestModule],
                declarations: [PendingTransactionDeleteDialogComponent],
                providers: [
                    PendingTransactionService
                ]
            })
            .overrideTemplate(PendingTransactionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PendingTransactionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PendingTransactionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
