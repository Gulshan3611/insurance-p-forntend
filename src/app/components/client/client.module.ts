import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ViewClientComponent } from './view-client/view-client.component'; 


@NgModule({
  declarations: [
    ClientListComponent,
    AddClientComponent,
    EditClientComponent,
    ViewClientComponent, 
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
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
export class ClientModule { }
