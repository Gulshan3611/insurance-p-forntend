import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleListComponent } from './role-list/role-list.component';


@NgModule({
  declarations: [
    RoleListComponent
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule
  ]
})
export class RoleManagementModule { }
