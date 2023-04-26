import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GstComponent } from './gst.component';
import { GstListComponent } from './gst-list/gst-list.component';
import { AddGstComponent } from './add-gst/add-gst.component';
import { EditGstComponent } from './edit-gst/edit-gst.component';
import { ViewGstComponent } from './view-gst/view-gst.component';

const routes: Routes = [
  {
    path:"",
    component:GstComponent,
    children:[
     {
      path:"list",
      component:GstListComponent
     },
     {
      path:"add",
      component:AddGstComponent
     },
     {
      path:"edit/:id",
      component:EditGstComponent
     },
     {
      path:"view/:id",
      component:ViewGstComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstRoutingModule { }
