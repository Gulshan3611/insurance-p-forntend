import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorManagementComponent } from './vendor-management.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';

const routes: Routes = [
  {
    path:"",
    component:VendorManagementComponent,
    children:[
     {
      path:"list",
      component:VendorListComponent
     },
     {
      path:"add",
      component:AddVendorComponent
     },
     {
      path:"edit/:id",
      component:EditVendorComponent
     },
     {
      path:"view/:id",
      component:ViewVendorComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorManagementRoutingModule { }
