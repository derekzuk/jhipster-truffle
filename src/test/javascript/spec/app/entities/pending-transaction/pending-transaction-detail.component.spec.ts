/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { Jhiptruffle2TestModule } from '../../../test.module';
import { PendingTransactionDetailComponent } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction-detail.component';
import { PendingTransactionService } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction.service';
import { PendingTransaction } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction.model';

describe('Component Tests', () => {

    describe('PendingTransaction Management Detail Component', () => {
        let comp: PendingTransactionDetailComponent;
        let fixture: ComponentFixture<PendingTransactionDetailComponent>;
        let service: PendingTransactionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Jhiptruffle2TestModule],
                declarations: [PendingTransactionDetailComponent],
                providers: [
                    PendingTransactionService
                ]
            })
            .overrideTemplate(PendingTransactionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PendingTransactionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PendingTransactionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PendingTransaction(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pendingTransaction).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
