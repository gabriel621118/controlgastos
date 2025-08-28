import { Component } from '@angular/core';
//import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'controlgastos';

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  barChartData = [
    { data: [65, 59, 80, 81], label: 'Ventas 2025' }
  ];

  barChartType: ChartType = 'bar';
}

