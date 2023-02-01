import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageInvoiceRoutingModule } from './manage-invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';


@NgModule({
  declarations: [
    InvoiceListComponent
  ],
  imports: [
    CommonModule,
    ManageInvoiceRoutingModule
  ]
})
export class ManageInvoiceModule { }
