import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BaseComponent } from './layout/base/base.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
//import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { GastosFilterPipe } from './pipes/gastos-filter.pipe'; // <-- IMPORTANTE
//import { ModalComponentsComponent } from './pages/modal-components/modal-components.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BaseComponent,
   // GastosFilterPipe,
   // DashboardComponent,
   // ModalComponentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
   RouterModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
 // exports: [NavbarComponent]
})
export class AppModule { }
