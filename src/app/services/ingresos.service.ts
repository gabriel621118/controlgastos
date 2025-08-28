import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Ingresos } from '../models/ingresos.model';
import { environment } from '../../environments/environment';
import { Data, Data2 } from '../models/data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  rutaserver=environment.url_serve

  constructor(private http:HttpClient) { }

/*
  obtenerIngresos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.rutaserver}/array_gastos`); // cambia la URL según tu API
  }
*/
  Obtener_Ingresos(){ 
    return this.http.get(`${this.rutaserver}/get_ingresos`)
  }

  
  Grabar_Ingresos(body:Ingresos){ 
    return this.http.post(`${this.rutaserver}/graba_ingresos`,body)
  }
  Actualiza_Ingresos(body:Ingresos){ 
    console.log('este es el body que mandamos al backend',body)
    return this.http.put(`${this.rutaserver}/update_ingresos/${body.id}`,body)
  }

         
    
/*
async obtenerVentasxmesGrafica(){ 
  const resp = await this.http.get(`${this.rutaserver}/reportes/gastoxmes/graficas`).toPromise() as Data2
  return resp.data
}


async obtenerGastosrubrosxmes(){ 
  const resp = await this.http.get(`${this.rutaserver}/reportes/gastoxmes_rubros/graficas`).toPromise() as Data2
  return resp.data
}
*/
}
