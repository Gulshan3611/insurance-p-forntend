import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ViewClientComponent } from './view-client/view-client.component';

const routes: Routes = [
  {
    path:"",
    component:ClientComponent,
    children:[
     {
      path:"list",
      component:ClientListComponent
     },
     {
      path:"add",
      component:AddClientComponent
     },
     {
      path:"edit/:id",
      component:EditClientComponent
     },
     {
      path:"view/:id",
      component:ViewClientComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
