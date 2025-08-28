import { Injectable } from '@angular/core';

import { Gastos } from '../models/gastos.model';

import { Rubros } from '../models/rubros.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
//import { Request, Response } from 'express';
//import { router as app } from './router';
import { Data, Data2 } from '../models/data.model';



@Injectable({
  providedIn: 'root'
})
export class ReportesService {
    rutaserver=environment.url_serve

    constructor(private http:HttpClient) { }



    

async obtenerVentasxmesGrafica(){ 
    const resp = await this.http.get(`${this.rutaserver}/reportes/gastoxmes/graficas`).toPromise() as Data2
    return resp.data
  }
 


  
async obtenerGastosxrubro(){ 
  const resp = await this.http.get(`${this.rutaserver}/reportes/gastoxmes_rubro/graficas`).toPromise() as Data2
  return resp.data
}


 
async obtenerGastosvsingresos(){ 
  const resp = await this.http.get(`${this.rutaserver}/reportes/gastoxmes/ingresos_vs_gastos`).toPromise() as Data2
  return resp.data
}


}


