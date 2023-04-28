import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicAuthInterceptor, AuthGuard, ErrorInterceptor, TimeoutInterceptor, DEFAULT_TIMEOUT } from '../app/_helpers';
import { AdminService, AuthService, SidebarService, updateHeaderService, RoleService,VendorService, StaffService, ProjectService,GstService, ResourceService } from './_services';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BlankComponent } from './layout/blank/blank.component';
import { FullComponent } from './layout/full/full.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { ResourceManagementComponent } from './components/resource-management/resource-management.component';
import { StaffManagementComponent } from './components/staff-management/staff-management.component';
import { VendorManagementComponent } from './components/vendor-management/vendor-management.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { ManageInvoiceComponent } from './components/manage-invoice/manage-invoice.component';  
import { ClientComponent } from './components/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    BlankComponent,
    FullComponent,
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RoleManagementComponent,
    StaffManagementComponent,
    VendorManagementComponent,
    ProjectManagementComponent,
    ManageInvoiceComponent,
    ClientComponent,
    ResourceManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxTrimDirectiveModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    ToastrModule.forRoot(),
    MomentModule,
    RouterModule
  ],
  providers: [
    SidebarService,
    updateHeaderService,
    AdminService,
    AuthService,
    RoleService,
    StaffService,
    ProjectService,
    VendorService,
    GstService,
    ResourceService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: TimeoutInterceptor, useClass: ErrorInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 60000 },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
