import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl,NgForm,FormArray} from '@angular/forms';
import{RubrosService} from'src/app/services/rubros.service';
import{GastosService} from'src/app/services/gastos.service';
//import{ReportesService} from'src/app/services/reportes.service';

import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Rubros } from 'src/app/models/rubros.model';
import { UpdateRubrosModalComponent } from '../modals/update-rubros-modal/update-rubros-modal.component';
import { ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexFill, ApexTitleSubtitle, ApexChart, ApexDataLabels, ApexMarkers, ApexTooltip } from 'ng-apexcharts';





@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit {
  forma:FormGroup ;
  modal:FormGroup;
  idlinea=0;
  rubros:any[]=[];
  //gastos:any[]=[];

  gastos: { date: string, value: number }[] = [];







/*

"data": [
        {
            "name": "Mascotas",
            "data": [
                {
                    "date": "Agosto",
                    "value": 600
                }
            ]
        },
        {
            "name": "Empleados",
            "data": [
                {
                    "date": "Agosto",
                    "value": 100
                },
                {
                    "date": "Septiembre",
                    "value": 300
                }
            ]
        }
    ]





*/








  tipoGrafica: 'mes' | 'rubro' = 'mes'; // valor por defecto

  datosGraficaMes: any[] = [];
  datosGraficaRubro: any[] = [];



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
    private repmeses:GastosService,
     private router:ActivatedRoute,private conexion:RubrosService,
    private modalService:NgbModal ) { 
    this.forma=this.fb.group({
      clave:[null,[Validators.required]]
 })
 this.modal=this.fb.group({
  descripcion2:[null,[Validators.required]]
                           })


 this.crearFormulario();
 this.cargarDataAlFormulario();

  }

  Lista_Rubros(){
    this.conexion.Obtener_Rubros().subscribe((read:any)=>{
      this.rubros=read.data;
      console.log('esta es el array',read);
      
    })
 }
/*
 Lista_Gastoscuenta(){
  this.repmeses.obtenerVentasxmesGrafica().subscribe((read:any)=>{
    //this.rubros=read.data;
    console.log('esta es el array',read);
    
  })  
}
*/
async Lista_Gastoscuenta2() {
  try {
    const res = await this.repmeses.obtenerVentasxmesGrafica();
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
}



openModalUpdateRubros(Rubro:Rubros){
  console.log('Estos son los datos que viene del Rubro',Rubro)
  const modalRef = this.modalService.open(UpdateRubrosModalComponent,{size:'lg'})
  modalRef.componentInstance.Rubro = Rubro
  modalRef.result.then(async ()=>{
    
     await this.Lista_Rubros()        
  })
 
}
  Reportexmeses(){

  }
/*
  ngOnInit(): void {
    this.Lista_Rubros()
    this.Lista_Gastoscuenta2()
    this.initChartData();
  }
  */
  async ngOnInit(): Promise<void> {

   await this.cargarDatos2();
   // await this.Lista_Gastoscuenta2(); // primero cargas los datos
    this.Lista_Rubros()
    this.initChartData();             
  }

  get categoNoValido() {
    return this.forma.get('descripcion')?.invalid && this.forma.get('descripcion')?.touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
     
      descripcion  : ['', [ Validators.required, Validators.minLength(5) ]  ],
    
      //correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
   
    });

  }

  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.forma.reset({
     
      descripcion: ''
     
    });

  }

 
  async cargarDatos1(){
   
      try {
        const res = await this.repmeses.obtenerVentasxmesGrafica();
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
    

  }

  
  async cargarDatos2(){
    try {
      const res = await this.repmeses.obtenerGastosrubrosxmes();
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


      /*
        this.series = this.gastos.map((rubro: any) => {
  const valoresPorMes = meses.map(mes => {
    const encontrado = rubro?.data?.find((d: any) => d.date === mes);
    return encontrado ? encontrado.value : 0;
  });

  return {
    name: rubro.name,
    data: valoresPorMes
      */
  
      
      
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }

}


Gastos_general(){}
Gastos_xrubros(){}

 
  guardar(){
    if(this.forma.valid){
      console.log(this.forma.value)
      this.conexion.Grabar_Rubros(this.forma.value).subscribe((resp:any) =>{
        console.log(resp)
        this.Lista_Rubros()
      })
   
    }
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
  }
   
}
