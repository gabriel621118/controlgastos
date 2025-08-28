import { Component, OnInit } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl,NgForm,FormArray} from '@angular/forms';
import{GastosService} from'src/app/services/gastos.service';
import{RubrosService} from'src/app/services/rubros.service';
import{ReportesService} from'src/app/services/reportes.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Gastos } from 'src/app/models/gastos.model';
import { Rubros } from 'src/app/models/rubros.model';
     import { UpdateGastosComponent } from '../../components/modal_components/update-gastos.component'; 
     import { ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexFill, ApexTitleSubtitle, ApexChart, ApexDataLabels, ApexMarkers, ApexTooltip } from 'ng-apexcharts';


    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { RouterModule, Routes } from '@angular/router';
    
    import{GastosFilterPipe} from '../../../pipes/gastos-filter.pipe'



@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
  forma:FormGroup ;
  modal:FormGroup;
  idlinea=0;
  gastos:any[]=[];
  gastos2:any[]=[]
  rubros:any[]=[];
    search:string = ''

  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;
  





  constructor(private fb: FormBuilder,
    private router:ActivatedRoute,private conexion:GastosService,
    private repmeses:ReportesService,
    private modalService:NgbModal,
    private conexionRubros:RubrosService ) { 
    this.forma=this.fb.group({
    monto:[null,[Validators.required]]
 })
 this.modal=this.fb.group({
  descripcion2:[null,[Validators.required]],
  selectrubro:[null,[Validators.required]],
  monto:[null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
 // monto2:[null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
                           })


 this.crearFormulario();
 this.cargarDataAlFormulario();

  }

  Lista_Gastos(){
    this.conexion.Obtener_Gastos().subscribe((read:any)=>{
      this.gastos2=read.data;
      console.log('esta es el array de gastos2',read);
      
    })
 }

 Lista_Rubros(){
  this.conexionRubros.Obtener_Rubros().subscribe((read:any)=>{
    this.rubros=read.data;
    console.log('esta es el array',read);
    
  })
}



openModalUpdateGastos(Gasto:Gastos){
  console.log('Estos son los datos que viene del Gasto',Gasto)
  const modalRef = this.modalService.open(UpdateGastosComponent,{size:'lg'})
  modalRef.componentInstance.Gasto = Gasto
  modalRef.result.then(async ()=>{
    
     await this.Lista_Gastos()        
  })
 
}


async ngOnInit(): Promise<void>  {
  
    await this.cargarDatos1();
    // await this.Lista_Ga  this.Lista_Rubros()
     this.initChartData();
     await this.Lista_Gastos()
     await this.Lista_Rubros()     
  }

 

  get categoNoValido() {
    return this.forma.get('descripcion')?.invalid && this.forma.get('descripcion')?.touched
    return this.forma.get('selectrubro')?.invalid && this.forma.get('selectrubro')?.touched
   
  }

  get montoNoValido(){

    return this.forma.get('monto')?.invalid && this.forma.get('monto')?.touched
  }
/*
  get monto2() {
    return this.forma.get('monto2');
  }
*/
  crearFormulario() {

    this.forma = this.fb.group({
     
      descripcion  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      selectrubro  : ['', [ Validators.required, Validators.minLength(1) ]  ],
      monto:[null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      //monto2:[null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      //correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
   
    });

  }

  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.forma.reset({
     
      descripcion: '',
      selectrubro: '',
      monto:''
     
    });

  }



 
  guardar(){
    if(this.forma.valid){
      console.log(this.forma.value)
      this.conexion.Grabar_Gastos(this.forma.value).subscribe((resp:any) =>{
        console.log(resp)
        this.Lista_Gastos()
      })
   
    }
   }

      
   
  async cargarDatos1(){
   
    try {
      const res = await this.conexion.obtenerVentasxmesGrafica();
      this.gastos = res.data;
  
  
      console.log('esta es la consulta de gastos',this.gastos)
  
      const categorias = this.gastos.map(g => g.date);    // ✅ corregido
      const montos = this.gastos.map(g => g.value);       // ✅ corregido
  
      this.series = [{ name: 'Gastos', data: montos }];
      this.xaxis = { categories: categorias };
  
      console.log('Series:', this.series);
      console.log('X Axis:', this.xaxis);
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }
  
   
 this.Lista_Rubros()  
 this.Lista_Gastos()
}


async cargarDatos2(){
  try {
    const res = await this.conexion.obtenerGastosrubrosxmes();
    this.gastos = res;
    console.log('dice que son datos inddfinidos',res)
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Establecer categorías del eje X
    this.xaxis = { categories: meses };

    // Crear series para cada rubro
    this.series = this.gastos.map((rubro: any) => {
      const valoresPorMes = meses.map(mes => {
        const encontrado = rubro?.data?.find((d: any) => d.date === mes);
        return encontrado ? encontrado.value : 0;
      });

      return {
        name: rubro.name,
        data: valoresPorMes
      };
    });

  } catch (error) {
    console.error('Error al obtener los datos', error);
  }

   
 this.Lista_Rubros()  
 this.Lista_Gastos()

}


public initChartData(): void {

    
  //this.series = [];
  this.chart = {
    type: "bar",
    stacked: false,
    height: 350,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: "zoom"
    }
  };
 // this.series = [{name:'Ventas',data:[1,2,3,4,5]}]
// this.series = [{name:'Ventas',data:this.gastos[1]}]
  this.dataLabels = {
    enabled: false
  };
  this.markers = {
    size: 0
  };
  this.title = {
    text: "text 1",
    align: "left"
  };
  this.yaxis = {
    labels: {
      formatter: function(val) {
        return val.toFixed(0);
      }
    },
    title: {
      text: "texto 2"
    },
    // min: this.min,
    // max: this.max,
  };
  // this.xaxis = {
  //   type: "datetime"
  // };

/*
  this.xaxis = {

     categories: [
       "ENe",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "Jun",
       "Jul",
       "Aug",
       "Sep"
     ]
  }*/
  this.tooltip = {
    shared: false,
    y: {
      formatter: function(val) {
        return val.toFixed(0);
      }
    }
  };

 this.Lista_Rubros()  
 this.Lista_Gastos()
}



}
