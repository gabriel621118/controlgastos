import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RubrosComponent } from './rubros/rubros.component';
import{UpdateRubrosModalComponent}from './modals/update-rubros-modal/update-rubros-modal.component'


import { DatosMaestrosComponent } from './datos-maestros.component';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';









//import { SubeimagenComponent } from './components/subeimagen/subeimagen/subeimagen.component';
const routes: Routes = [
  {
    path: 'rubros',
    component:RubrosComponent,
  },
 
  
]


@NgModule({
  declarations: [

    RubrosComponent,
    DatosMaestrosComponent,
    UpdateRubrosModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule,
    
]
})
export class DatosMaestrosModule { }
