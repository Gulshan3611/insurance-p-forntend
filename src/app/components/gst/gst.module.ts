import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { MomentModule } from 'ngx-moment';

import { GstRoutingModule } from './gst-routing.module';
import { GstComponent } from './gst.component';
import { GstListComponent } from './gst-list/gst-list.component';
import { AddGstComponent } from './add-gst/add-gst.component';
import { EditGstComponent } from './edit-gst/edit-gst.component';
import { ViewGstComponent } from './view-gst/view-gst.component';


@NgModule({
  declarations: [
    GstComponent,
    GstListComponent,
    AddGstComponent,
    EditGstComponent,
    ViewGstComponent
  ],
  imports: [
    CommonModule,
    GstRoutingModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    MomentModule
  ]
})
export class GstModule { }
