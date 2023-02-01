import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {
    path:"",
    component:ProjectListComponent,
    children:[
     {
      path:"list",
      component:ProjectListComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
