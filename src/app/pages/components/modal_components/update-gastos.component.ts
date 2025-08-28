//import { Component, OnInit } from '@angular/core';

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { RubrosService } from 'src/app/services/rubros.service';
import { GastosService } from 'src/app/services/gastos.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
//import { Rubros } from 'src/app/models/rubros.model';
import{Gastos} from '../../../models/gastos.model'


@Component({
  selector: 'app-update-gastos',
  templateUrl: './update-gastos.component.html',
  styleUrls: ['./update-gastos.component.css']
})
export class UpdateGastosComponent implements OnInit {

 
 
  @Input() Gasto:any;
    
  Gastos:any[]=[];
  Rubros:any[]=[];
 RubrosFormGroup : FormGroup;
   
   constructor(private fb: FormBuilder ,public activeModal:NgbActiveModal,
     private router:ActivatedRoute,
     private rubrosservice : RubrosService,private conexion:GastosService, private modalService:NgbModal) { 
   this.RubrosFormGroup = this.fb.group({
     id:[null],
     gasto:[null,[Validators.required,Validators.minLength(5)]],
     monto:[null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
     selectrubro:[null,[Validators.required]],
    
   })
   }
 
   
 Lista_Gastos(){
  this.conexion.Obtener_Gastos().subscribe((read:any)=>{
     this.Gastos=read.data;
     console.log('esta es el array',read);
     
   })
 }

  
 Lista_Rubros(){
  this.rubrosservice.Obtener_Rubros().subscribe((read:any)=>{
     this.Rubros=read.data;
     console.log('esta es el array',read);
     
   })
 }

 
   ngOnInit(): void {
    
    this.editarGasto(this.Gasto)
     console.log('aqui se inicializa-------------------',this.Gasto)
     this.Lista_Gastos();
     this.Lista_Rubros();
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
 
 
   editarGasto(Gasto:Gastos){
     console.log(Gasto.id)
     this.RubrosFormGroup.controls['id'].setValue(Gasto.id);
     this.RubrosFormGroup.controls['gasto'].setValue(Gasto.concepto);
     this.RubrosFormGroup.controls['monto'].setValue(Gasto.monto);
     this.RubrosFormGroup.controls['selectrubro'].setValue(Gasto.rubroId)
    
   }
 
  
 
   cambiarGasto(){
     if (this.RubrosFormGroup.invalid) {
       return Object.values( this.RubrosFormGroup.controls).forEach(control => {
        if (control instanceof FormGroup ) {
         Object.values( control.controls).forEach(control => control.markAsTouched());
        } else {
           control.markAsTouched();
        }
      });
     }

     




     this.conexion.Actualiza_Gastos(this.RubrosFormGroup.value).subscribe((resp:any) =>{
       if(resp.ok){
         console.log('cambiado')
         this.activeModal.close()
       }
       this.RubrosFormGroup.reset()
     })
   }


}
