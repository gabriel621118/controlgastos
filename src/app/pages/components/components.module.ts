import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Gastos } from 'src/app/models/gastos.model';
import { GastosComponent } from './gastos/gastos.component';
import { UpdateGastosComponent } from './modal_components/update-gastos.component';
import { ComponentsComponent } from './components.component';
//import { ReporteMesesComponent } from './reportes/reporte-meses/reporte-meses.component';
//import { ModalComponentsComponent } from './pages/modal-components/modal-components.component';
//import { UpdateGastosComponent } from './pages/components/gastos/modal_components/update-gastos.component';
//import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
//import { ReportesxmesComponent } from './reportes/reportesxmes/reportesxmes.component';
import { GraficasComponent } from './graficos/graficas/graficas.component';
import { InfograficaComponent } from './graficos/infografica/infografica.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { UpdateIngresosComponent } from './modal_components/update-ingresos/update-ingresos.component';
//import { GastoService, Gasto } from '../../../../services/gasto.service';
import{GastosFilterPipe} from '../../pipes/gastos-filter.pipe'

const routes: Routes = [
  {
    path: 'gastos',
    component:GastosComponent,
  },

  {
    path: 'update_gastos',
    component:GastosComponent,
  },
  {
    path: 'ingresos',
    component:IngresosComponent,
  },
  {
    path: 'update_ingresos',
    component:UpdateIngresosComponent,
  },
 
  
]

@NgModule({
  declarations: [
   GastosComponent,
  UpdateGastosComponent,
   ComponentsComponent,
   //ReportesxmesComponent,
   GraficasComponent,
   InfograficaComponent,
   IngresosComponent,
   UpdateIngresosComponent,
   //ReporteMesesComponent
   GastosFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    //NgApexchartsModule,
    HttpClientModule,
    NgbModule,
    NgApexchartsModule,


   
    FormsModule,

   
 
   
   
    
  ]
})
export class ComponentsModule { }
