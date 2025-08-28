
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { RubrosService } from 'src/app/services/rubros.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Rubros } from 'src/app/models/rubros.model';




@Component({
  selector: 'app-update-rubros-modal',
  templateUrl: './update-rubros-modal.component.html',
  styleUrls: ['./update-rubros-modal.component.css']
})
export class UpdateRubrosModalComponent implements OnInit {



 
  @Input() Rubro:any;
    
  Rubros:any[]=[];
 RubrosFormGroup : FormGroup;
   
   constructor(private fb: FormBuilder ,public activeModal:NgbActiveModal,
     private router:ActivatedRoute,private conexion:RubrosService, private modalService:NgbModal) { 
   this.RubrosFormGroup = this.fb.group({
     id:[null],
     descripcion:[null,[Validators.required,Validators.minLength(5)]],
     selectrubro:[null,[Validators.required]],
    
   })
   }
 
   
 Lista_Rubros(){
  this.conexion.Obtener_Rubros().subscribe((read:any)=>{
     this.Rubros=read.data;
     console.log('esta es el array',read);
     
   })
 }



 
   ngOnInit(): void {
    
    this.editarRubro(this.Rubro)
     console.log('aqui se inicializa-------------------',this.Rubro)
     this.Lista_Rubros();
   }

   get descripNoValido() {
    return this.RubrosFormGroup.get('descripcion')?.invalid && this.RubrosFormGroup.get('descripcion')?.touched
  }  
  get nombreNoValido() {
    return this.RubrosFormGroup.get('nombre')?.invalid && this.RubrosFormGroup.get('nombre')?.touched
  }
 
 
   editarRubro(Rubro:Rubros){
     console.log(Rubro.id)
     this.RubrosFormGroup.controls['id'].setValue(Rubro.id);
     this.RubrosFormGroup.controls['descripcion'].setValue(Rubro.descripcion);
     this.RubrosFormGroup.controls['selectrubro'].setValue(Rubro.id);
    
   }
 
  
 
   cambiarRubro(){
     if (this.RubrosFormGroup.invalid) {
       return Object.values( this.RubrosFormGroup.controls).forEach(control => {
        if (control instanceof FormGroup ) {
         Object.values( control.controls).forEach(control => control.markAsTouched());
        } else {
           control.markAsTouched();
        }
      });
     }

     




     this.conexion.Actualiza_Rubros(this.RubrosFormGroup.value).subscribe((resp:any) =>{
       if(resp.ok){
         console.log('cambiado')
         this.activeModal.close()
       }
       this.RubrosFormGroup.reset()
     })
   }

}
