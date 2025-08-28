import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';


import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute,Router } from '@angular/router';

import { identifierModuleUrl, identifierName } from '@angular/compiler';













export const  montos:any[]=[], series = {
   
    monthDataSeries1: {
  
      montos:[2345,3454,445,5554,123],
      prices: [
        800.85,
        8128.0,
        8122.9,
        8165.5,
        8340.7,
        8423.7,
        8423.5,
        8514.3,
        8481.85,
        8487.7,
        8506.9,
        8626.2
       
      ],
      dates: [
        "Enero1",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
        
      ]
    },
  };
  