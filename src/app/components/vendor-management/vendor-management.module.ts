import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorManagementRoutingModule } from './vendor-management-routing.module';
import { VendorListComponent } from './vendor-list/vendor-list.component';


@NgModule({
  declarations: [
    VendorListComponent
  ],
  imports: [
    CommonModule,
    VendorManagementRoutingModule
  ]
})
export class VendorManagementModule { }
