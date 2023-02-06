import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageInvoiceComponent } from './manage-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { PreviewInvoiceComponent } from './preview-invoice/preview-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

const routes: Routes = [
  {
    path:"",
    component:ManageInvoiceComponent,
    children:[
     {
      path:"list",
      component:InvoiceListComponent
     },
     {
      path:"add",
      component:AddInvoiceComponent
     },
     {
      path:"edit/:id",
      component:EditInvoiceComponent
     },
     {
      path:"preview/:id",
      component:PreviewInvoiceComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageInvoiceRoutingModule { }
