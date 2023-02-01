import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffManagementRoutingModule } from './staff-management-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';


@NgModule({
  declarations: [
    StaffListComponent
  ],
  imports: [
    CommonModule,
    StaffManagementRoutingModule
  ]
})
export class StaffManagementModule { }
