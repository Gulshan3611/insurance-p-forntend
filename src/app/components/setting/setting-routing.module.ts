import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingComponent } from './setting.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:"",
    component:SettingComponent,
    children:[
     {
      path:"profile",
      component:ProfileComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
