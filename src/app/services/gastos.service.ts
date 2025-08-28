import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Gastos } from '../models/gastos.model';
import { environment } from '../../environments/environment';
import { Data, Data2 } from '../models/data.model';

import { Observable } from 'rxjs';
export interface Gasto {
  id: number;
  concepto: string;
  monto: number;
  fecha: string;
  createdAt: string;
  updatedAt: string;
  rubroId: number;
}






@Injectable({
  providedIn: 'root'
})
export class GastosService {
  rutaserver=environment.url_serve

  constructor(private http:HttpClient) { }


  obtenerGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.rutaserver}/array_gastos`); // cambia la URL según tu API
  }

  Obtener_Gastos(){ 
    return this.http.get(`${this.rutaserver}/get_gastos`)
  }

  
  Grabar_Gastos(body:Gastos){ 
    return this.http.post(`${this.rutaserver}/graba_gastos`,body)
  }
  Actualiza_Gastos(body:Gastos){ 
    console.log('este es el body que mandamos al backend',body)
    return this.http.put(`${this.rutaserver}/update_gastos/${body.id}`,body)
  }


    

async obtenerVentasxmesGrafica(){ 
  const resp = await this.http.get(`${this.rutaserver}/reportes/gastoxmes/graficas`).toPromise() as Data2
  return resp.data
}


async obtenerGastosrubrosxmes(){ 
  const resp = await this.http.get(`${this.rutaserver}/reportes/gastoxmes_rubros/graficas`).toPromise() as Data2
  return resp.data
}

}
