import { Component, OnInit } from '@angular/core';



import { ControlContainer, NgForm } from '@angular/forms';
import { GastosService } from '../../../../services/gastos.service';

import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';

//import { id } from 'date-fns/locale';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute,Router } from '@angular/router';
//import format from 'date-fns/format'
//import subMonths from 'date-fns/subMonths'
//import parseJSON from 'date-fns/parseJSON'
import { identifierModuleUrl, identifierName } from '@angular/compiler';
//import { addDays, getDate } from 'date-fns';
//import { parseISO } from 'date-fns/esm';
//import * as moment from 'moment';



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
import { montos } from '../data';
import { series } from "../data";
import { NgIf } from '@angular/common';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;


}




@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
