import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators,FormControl,NgForm,FormArray} from '@angular/forms';
import{IngresosService} from'src/app/services/ingresos.service';
import{RubrosService} from'src/app/services/rubros.service';
import{ReportesService} from'src/app/services/reportes.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Ingresos } from 'src/app/models/ingresos.model';
import { Rubros } from 'src/app/models/rubros.model';
     import { UpdateIngresosComponent } from '../../components/modal_components/update-ingresos/update-ingresos.component'; 
     import { ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexFill, ApexTitleSubtitle, ApexChart, ApexDataLabels, ApexMarkers, ApexTooltip } from 'ng-apexcharts';


    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { RouterModule, Routes } from '@angular/router';



@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  forma:FormGroup ;
  modal:FormGroup;
  idlinea=0;
  ingresos:any[]=[];
  ingresosvsgastos:any[]=[]
  rubros:any[]=[];



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
    private router:ActivatedRoute,private conexion:IngresosService,
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

  Lista_Ingresos(){
    this.conexion.Obtener_Ingresos().subscribe((read:any)=>{
      this.ingresos=read.data;
      console.log('esta es el array de ingresos',this.ingresos);
      
    })
 }

 Lista_Rubros(){
  this.conexionRubros.Obtener_Rubros().subscribe((read:any)=>{
    this.rubros=read.data;
    console.log('esta es el array',read);
    
  })
}



openModalUpdateIngresos(Ingreso:Ingresos){
  console.log('Estos son los datos que viene del Gasto',Ingreso)
  const modalRef = this.modalService.open(UpdateIngresosComponent,{size:'lg'})
  modalRef.componentInstance.Ingreso = Ingreso
  modalRef.result.then(async ()=>{
    
     await this.Lista_Ingresos()        
  })
 
}


  
   
async cargarDatos1(){
   
  try {
    const res = await this.repmeses.obtenerGastosvsingresos();
    this.ingresosvsgastos = res.data;


    console.log('esta es la consulta de ingresos_vs_gastos',this.ingresosvsgastos)

    const categorias = this.ingresosvsgastos.map(g => g.date);    // ✅ corregido
    const montos = this.ingresosvsgastos.map(g => g.value);       // ✅ corregido
    //const montos2 = this.gastos.map(g => g.value);


  /*
   
      setSeries([
        {
          name: data.ingresos.name,
          data: data.ingresos.data.map((item: any) => item.value),
        },
        {
          name: data.gastos.name,
          data: data.gastos.data.map((item: any) => item.value),
        },
        {
          name: data.saldo.name,
          data: data.saldo.data.map((item: any) => item.value),
        },
      ]);
    };


  */

  

    
    this.series = [{ name: 'Ingresos', data: montos }];
    this.xaxis = { categories: categorias };

    console.log('Series:', this.series);
    console.log('X Axis:', this.xaxis);
  } catch (error) {
    console.error('Error al obtener los datos', error);
  }

 
this.Lista_Rubros()  
this.Lista_Ingresos()
}



   
async cargarDatos2(){
   
  try {
    const res = await this.repmeses.obtenerGastosvsingresos();
    //this.ingresosvsgastos = res.data;
    this.ingresosvsgastos = [res.ingresos, res.gastos, res.saldo];

    console.log('esta es la consulta de ingresos_vs_gastos',this.ingresosvsgastos)
    console.log('Respuesta completa:', res);
    
  
    const gastos = res.gastos.data.map((d: { date: string; value: number }) => d.value);
    const ingresos = res.ingresos.data.map((d: { date: string; value: number }) => d.value);
    const saldo = res.saldo.data.map((d: { date: string; value: number }) => d.value);
    const categorias = res.gastos.data.map((d: { date: string; value: number }) => d.date);





    this.series = [
      { name: 'Ingresos', data: ingresos },
      { name: 'Gastos', data: gastos },
      { name: 'Saldo acumulado', data: saldo }
    ];

    this.xaxis = {
      categories: categorias
    };

    console.log('Series:', this.series);
    console.log('X Axis:', this.xaxis);
  } catch (error) {
    console.error('Error al obtener los datos', error);
  }

  this.Lista_Rubros();
  this.Lista_Ingresos();
}


/*
async cargarDatos2() {
  try {
    const res = await this.repmeses.obtenerGastosvsingresos();

    console.log('Respuesta completa:', res);

    // Preparar series para el gráfico
    this.series = [
      {
        name: res.ingresos.name,
        data: res.ingresos.data
      },
      {
        name: res.gastos.name,
        data: res.gastos.data
      },
      {
        name: res.saldo.name,
        data: res.saldo.data
      }
    ];

    // Suponiendo 12 meses
    this.xaxis = {
      categories: [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ]
    };

    console.log('Series:', this.series);
    console.log('X Axis:', this.xaxis);
  } catch (error) {
    console.error('Error al obtener los datos', error);
  }

  // Llamadas adicionales
  this.Lista_Rubros();
  this.Lista_Ingresos();
}
📊 Resultado:
Si estás usando ApexCharts, esta estructura es la correcta:

ts
Copiar código
series:


*/





async ngOnInit(): Promise<void>  {
  

    // await this.Lista_Ga  this.Lista_Rubros()
    await this.cargarDatos2();
    await this.Lista_Ingresos()
    await this.Lista_Rubros() 
   
    this.initChartData();   
    
     
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
      this.conexion.Grabar_Ingresos(this.forma.value).subscribe((resp:any) =>{
        console.log(resp)
        this.Lista_Ingresos()
      })
   
    }
   }

      
   

/*------------------------metodo para graficar gastos vs ingresos----------------------




Gracias por compartir tu código. Lo que quieres hacer es combinar ingresos y gastos mensuales en una sola gráfica, pero además, aplicar una lógica de saldo acumulado donde:

Cada mes inicia con el saldo remanente del mes anterior (ingresos - gastos).

Luego se le suman los ingresos del mes actual.

Y se le restan los gastos del mes actual.

El resultado se pasa como saldo al mes siguiente.

Vamos a trabajar esta lógica paso a paso.

✅ Requisitos:

Obtener gastos por mes.

Obtener ingresos por mes.

Calcular saldo acumulado mes a mes.

Devolver todo esto al frontend para graficar.

🔧 Supuestos:

Tienes un modelo Ingresos similar a Gastos.

Ambos modelos tienen un campo fecha y un campo monto.

✅ Solución propuesta:
app.get('/reportes/gastoxmes/graficas', async (_req: Request, res: Response) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    try {
        // Obtener todos los gastos e ingresos ordenados por fecha
        const gastos = await Gastos.findAll({ order: [['fecha', 'ASC']] });
        const ingresos = await Ingresos.findAll({ order: [['fecha', 'ASC']] });

        // Inicializar estructuras
        const datosPorMes: Record<string, { ingresos: number, gastos: number, saldo: number }> = {};
        for (const mes of meses) {
            datosPorMes[mes] = { ingresos: 0, gastos: 0, saldo: 0 };
        }

        // Agrupar gastos por mes
        for (const gasto of gastos) {
            const mes = getMonth(gasto.getDataValue('fecha')); // 0 = Enero
            const mesNombre = meses[mes];
            datosPorMes[mesNombre].gastos += gasto.getDataValue('monto');
        }

        // Agrupar ingresos por mes
        for (const ingreso of ingresos) {
            const mes = getMonth(ingreso.getDataValue('fecha'));
            const mesNombre = meses[mes];
            datosPorMes[mesNombre].ingresos += ingreso.getDataValue('monto');
        }

        // Calcular saldo acumulado
        let saldoAnterior = 0;
        for (const mes of meses) {
            const datosMes = datosPorMes[mes];
            const saldo = saldoAnterior + datosMes.ingresos - datosMes.gastos;
            datosMes.saldo = saldo;
            saldoAnterior = saldo;
        }

        // Preparar datos para la gráfica
        const respuesta = {
            gastos: {
                name: 'Gastos',
                data: meses.map(mes => ({ date: mes, value: datosPorMes[mes].gastos }))
            },
            ingresos: {
                name: 'Ingresos',
                data: meses.map(mes => ({ date: mes, value: datosPorMes[mes].ingresos }))
            },
            saldo: {
                name: 'Saldo acumulado',
                data: meses.map(mes => ({ date: mes, value: datosPorMes[mes].saldo }))
            }
        };

        return res.json({ ok: true, data: respuesta });

    } catch (error) {
        return res.status(500).json({ ok: false, error });
    }
});

*/

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
 this.Lista_Ingresos()
}


}
