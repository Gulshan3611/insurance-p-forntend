import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceManagementComponent } from './resource-management.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { ViewResourceComponent } from './view-resource/view-resource.component';

const routes: Routes = [
  {
    path:"",
    component:ResourceManagementComponent,
    children:[
     {
      path:"list",
      component:ResourceListComponent
     },
     {
      path:"add",
      component:AddResourceComponent
     },
     {
      path:"edit/:id",
      component:EditResourceComponent
     },
     {
      path:"view/:id",
      component:ViewResourceComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceManagementRoutingModule { }
