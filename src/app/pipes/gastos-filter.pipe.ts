import { Pipe, PipeTransform } from '@angular/core';
import { Gastos } from'../models/gastos.model';


@Pipe({
  name: 'gastosFilter'
})
export class GastosFilterPipe implements PipeTransform {


  transform(mObjects: Gastos[], input: string): Gastos[] {
    if (!input) return mObjects;
    input = input.toLowerCase();
  
    return mObjects.filter(gasto => {
      return (
        gasto.concepto?.toLowerCase().includes(input) ||
        gasto.monto?.toString().includes(input) ||
        gasto.rubro?.descripcion?.toLowerCase().includes(input)
      );
    });
  }
  
}





















/*
  transform(mObjects:Gastos[], input: string){
    if (!input) return mObjects;
    return mObjects.filter(val => this.filterBy(val, input));
  }



  private filterBy(
    mObject: Gastos ,search: string
  ) {
    const reduced = Object.keys(mObject)
      .reduce((prev, current) => this.reduceKeys(prev, current, mObject), "")
      .toLocaleLowerCase();
    return reduced.indexOf(search.toLocaleLowerCase()) > -1;
  }

  private reduceKeys(
    prev: string,
    current: string,
    mObject:   Gastos): string {
    if (this.isProp(current)) {
      prev = `${prev}\$${(mObject as any)[current]}`;
    }
    return prev;
  }

  //Aquí validas que propiedades quieres que se filtren.
  private isProp(key: string): boolean {
    return key.includes("concepto");
  }

*/




/*
transform(mObjects: Gastos[], input: string): Gastos[] {
  if (!input) return mObjects;
  input = input.toLowerCase();

  return mObjects.filter(gasto => {
    return (
      gasto.concepto?.toLowerCase().includes(input) ||
      gasto.monto?.toString().includes(input) ||
      gasto.rubro?.descripcion?.toLowerCase().includes(input)
    );
  });
}

*/