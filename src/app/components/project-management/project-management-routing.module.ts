import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectManagementComponent } from './project-management.component';
import { ProjectListComponent } from './project-list/project-list.component';;
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';

const routes: Routes = [
  {
    path:"",
    component:ProjectManagementComponent,
    children:[
     {
      path:"list",
      component:ProjectListComponent
     },
     {
      path:"add",
      component:AddProjectComponent
     },
     {
      path:"edit/:id",
      component:EditProjectComponent
     },
     {
      path:"view/:id",
      component:ViewProjectComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
