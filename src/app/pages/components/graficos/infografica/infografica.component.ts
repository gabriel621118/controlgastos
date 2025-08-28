//import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit, Output,EventEmitter, ViewChild, OnChanges, SimpleChanges, AfterViewChecked, AfterContentChecked, AfterContentInit  } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { GastosService } from 'src/app/services/gastos.service';

import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';


import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute,Router } from '@angular/router';

import { identifierModuleUrl, identifierName } from '@angular/compiler';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

@Component({
  selector: 'app-infografica',
  templateUrl: './infografica.component.html',
  styleUrls: ['./infografica.component.css']
})
export class InfograficaComponent implements OnInit {

  
  Elpresupuestogeneral:any[]=[];
  Montoxmes:[]=[];
  Montosgrafica:[]=[];
  Meses:any[]=[];
  //parametros del boton 1------------------------------------------------------
  Enviaordenes:any[]=[400,500,900];
  Enviaavisos:any[]=[200,300,500];
  Enviaconcluidos:any[]=[150,200,300];
  Enviaetiqueta1:any[]=["ptracosa"];
  Ordenes:any[]=[];
  Avisos:any[]=[];
  Concluidos:any[]=[];
  etiqueta1:any[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
