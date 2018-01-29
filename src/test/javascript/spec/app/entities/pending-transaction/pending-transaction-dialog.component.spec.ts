/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Jhiptruffle2TestModule } from '../../../test.module';
import { PendingTransactionDialogComponent } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction-dialog.component';
import { PendingTransactionService } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction.service';
import { PendingTransaction } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction.model';

describe('Component Tests', () => {

    describe('PendingTransaction Management Dialog Component', () => {
        let comp: PendingTransactionDialogComponent;
        let fixture: ComponentFixture<PendingTransactionDialogComponent>;
        let service: PendingTransactionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Jhiptruffle2TestModule],
                declarations: [PendingTransactionDialogComponent],
                providers: [
                    PendingTransactionService
                ]
            })
            .overrideTemplate(PendingTransactionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PendingTransactionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PendingTransactionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PendingTransaction(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.pendingTransaction = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pendingTransactionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PendingTransaction();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.pendingTransaction = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pendingTransactionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
