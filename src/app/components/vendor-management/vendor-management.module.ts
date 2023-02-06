import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';

import { VendorManagementRoutingModule } from './vendor-management-routing.module';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';


@NgModule({
  declarations: [
    VendorListComponent,
    AddVendorComponent,
    EditVendorComponent,
    ViewVendorComponent
  ],
  imports: [
    CommonModule,
    VendorManagementRoutingModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule
  ]
})
export class VendorManagementModule { }
