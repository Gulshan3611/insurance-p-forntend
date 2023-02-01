import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BlankComponent } from './blank/blank.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FullComponent } from './full/full.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    SidebarComponent,
    BlankComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FullComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
