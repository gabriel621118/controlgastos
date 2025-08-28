

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

import { IngresosService } from 'src/app/services/ingresos.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
//import { Rubros } from 'src/app/models/rubros.model';
import{Ingresos} from '../../../../models/ingresos.model'

@Component({
  selector: 'app-update-ingresos',
  templateUrl: './update-ingresos.component.html',
  styleUrls: ['./update-ingresos.component.css']
})
export class UpdateIngresosComponent implements OnInit {

 
  @Input() Ingreso:any;
    
  Ingresos:any[]=[];
  Rubros:any[]=[];
 RubrosFormGroup : FormGroup;
   
   constructor(private fb: FormBuilder ,public activeModal:NgbActiveModal,
     private router:ActivatedRoute,
    private conexion:IngresosService, private modalService:NgbModal) { 
   this.RubrosFormGroup = this.fb.group({
     id:[null],
     gasto:[null,[Validators.required,Validators.minLength(5)]],
     monto:[null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
    
    
   })
   }
 
   
 Lista_Ingresos(){
  this.conexion.Obtener_Ingresos().subscribe((read:any)=>{
     this.Ingresos=read.data;
     console.log('esta es el array',read);
     
   })
 }

  

 
   ngOnInit(): void {
    
    this.editarIngreso(this.Ingreso)
     console.log('aqui se inicializa-------------------',this.Ingreso)
     this.Lista_Ingresos();
     
   }

   get descripNoValido() {
    return this.RubrosFormGroup.get('gasto')?.invalid && this.RubrosFormGroup.get('gasto')?.touched
  }  
  get nombreNoValido() {
    return this.RubrosFormGroup.get('nombre')?.invalid && this.RubrosFormGroup.get('nombre')?.touched
  }
  get montoNoValido(){

    return this.RubrosFormGroup.get('monto')?.invalid && this.RubrosFormGroup.get('monto')?.touched
  }
 
 
   editarIngreso(Ingreso:Ingresos){
     console.log(Ingreso.id)
     this.RubrosFormGroup.controls['id'].setValue(Ingreso.id);
     this.RubrosFormGroup.controls['gasto'].setValue(Ingreso.concepto);
     this.RubrosFormGroup.controls['monto'].setValue(Ingreso.monto);
    
   }
 
  
 
   cambiarIngreso(){
     if (this.RubrosFormGroup.invalid) {
       return Object.values( this.RubrosFormGroup.controls).forEach(control => {
        if (control instanceof FormGroup ) {
         Object.values( control.controls).forEach(control => control.markAsTouched());
        } else {
           control.markAsTouched();
        }
      });
     }

     




     this.conexion.Actualiza_Ingresos(this.RubrosFormGroup.value).subscribe((resp:any) =>{
       if(resp.ok){
         console.log('cambiado')
         this.activeModal.close()
       }
       this.RubrosFormGroup.reset()
     })
   }
}
