/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { Jhiptruffle2TestModule } from '../../../test.module';
import { PendingTransactionComponent } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction.component';
import { PendingTransactionService } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction.service';
import { PendingTransaction } from '../../../../../../main/webapp/app/entities/pending-transaction/pending-transaction.model';

describe('Component Tests', () => {

    describe('PendingTransaction Management Component', () => {
        let comp: PendingTransactionComponent;
        let fixture: ComponentFixture<PendingTransactionComponent>;
        let service: PendingTransactionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Jhiptruffle2TestModule],
                declarations: [PendingTransactionComponent],
                providers: [
                    PendingTransactionService
                ]
            })
            .overrideTemplate(PendingTransactionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PendingTransactionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PendingTransactionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PendingTransaction(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pendingTransactions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
