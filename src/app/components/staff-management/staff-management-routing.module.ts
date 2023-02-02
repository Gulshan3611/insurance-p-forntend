import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffManagementComponent } from './staff-management.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';

const routes: Routes = [
  {
    path:"",
    component:StaffManagementComponent,
    children:[
     {
      path:"list",
      component:StaffListComponent
     },
     {
      path:"add",
      component:AddStaffComponent
     },
     {
      path:"edit/:id",
      component:EditStaffComponent
     },
     {
      path:"view/:id",
      component:ViewStaffComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffManagementRoutingModule { }
