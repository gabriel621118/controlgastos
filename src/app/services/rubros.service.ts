import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Rubros } from '../models/rubros.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RubrosService {
  rutaserver=environment.url_serve

  constructor(private http:HttpClient) { }

  Obtener_Rubros(){ 
    return this.http.get(`${this.rutaserver}/get_rubros`)
  }

  
  Grabar_Rubros(body:Rubros){ 
    return this.http.post(`${this.rutaserver}/graba_rubros`,body)
  }
  Actualiza_Rubros(body:Rubros){ 
    console.log('este es el body que mandamos al backend',body)
    return this.http.put(`${this.rutaserver}/update_rubros/${body.id}`,body)
  }


}

