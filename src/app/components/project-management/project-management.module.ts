import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';


@NgModule({
  declarations: [
    ProjectListComponent,
    AddProjectComponent,
    EditProjectComponent,
    ViewProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    Ng2FlatpickrModule
  ]
})
export class ProjectManagementModule { }
