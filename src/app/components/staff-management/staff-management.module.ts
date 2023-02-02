import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';

import { StaffManagementRoutingModule } from './staff-management-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';


@NgModule({
  declarations: [
    StaffListComponent,
    AddStaffComponent,
    EditStaffComponent,
    ViewStaffComponent
  ],
  imports: [
    CommonModule,
    StaffManagementRoutingModule,
    NgbModule,
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
export class StaffManagementModule { }
