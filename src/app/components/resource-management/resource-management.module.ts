import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';

import { ResourceManagementRoutingModule } from './resource-management-routing.module';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { ViewResourceComponent } from './view-resource/view-resource.component';


@NgModule({
  declarations: [
    ResourceListComponent,
    AddResourceComponent,
    EditResourceComponent,
    ViewResourceComponent,
  ],
  imports: [
    CommonModule,
    ResourceManagementRoutingModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule
  ]
})
export class ResourceManagementModule { }
