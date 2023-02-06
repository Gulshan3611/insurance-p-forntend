import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlankComponent } from './layout/blank/blank.component';
import { FullComponent } from './layout/full/full.component';

import {AuthGuard } from '../app/_helpers';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth-routing.module').then(m => m.AuthRoutingModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'vendor-management',
        loadChildren: () => import('./components/vendor-management/vendor-management.module').then(m => m.VendorManagementModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'staff-management',
        loadChildren: () => import('./components/staff-management/staff-management.module').then(m => m.StaffManagementModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'role-management',
        loadChildren: () => import('./components/role-management/role-management.module').then(m => m.RoleManagementModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'invoice-management',
        loadChildren: () => import('./components/manage-invoice/manage-invoice.module').then(m => m.ManageInvoiceModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'project-management',
        loadChildren: () => import('./components/project-management/project-management.module').then(m => m.ProjectManagementModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'client-management',
        loadChildren: () => import('./components/client/client.module').then(m => m.ClientModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'setting',
        loadChildren: () => import('./components/setting/setting.module').then(m => m.SettingModule)
      },
    ]
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
