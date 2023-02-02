import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';


@NgModule({
  declarations: [
    SettingComponent,
    ChangePasswordComponent,
    ProfileComponent,
    CompanyDetailComponent,
    BankDetailComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    RouterModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule
  ]
})
export class SettingModule { }
