import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { MomentModule } from 'ngx-moment';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ManageInvoiceRoutingModule } from './manage-invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { PreviewInvoiceComponent } from './preview-invoice/preview-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';


@NgModule({
  declarations: [
    InvoiceListComponent,
    AddInvoiceComponent,
    PreviewInvoiceComponent,
    ViewInvoiceComponent,
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    ManageInvoiceRoutingModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    MomentModule,
    BsDatepickerModule.forRoot()
  ]
})
export class ManageInvoiceModule { }
