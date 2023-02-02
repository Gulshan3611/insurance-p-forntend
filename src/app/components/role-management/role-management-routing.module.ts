import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleManagementComponent } from './role-management.component';
import { RoleListComponent } from './role-list/role-list.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { ViewRoleComponent } from './view-role/view-role.component';

const routes: Routes = [
  {
    path:"",
    component:RoleManagementComponent,
    children:[
     {
      path:"list",
      component:RoleListComponent
     },
     {
      path:"add",
      component:AddRoleComponent
     },
     {
      path:"edit/:id",
      component:EditRoleComponent
     },
     {
      path:"view/:id",
      component:ViewRoleComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
