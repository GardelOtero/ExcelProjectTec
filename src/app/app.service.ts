import { Injectable } from '@angular/core';
import * as dfd from "danfojs";
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  TYPE_XLSX: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  TYPE_CSV: string = "text/csv";

  constructor() { 
    console.log("This is app Service Constructor");
  }

  startMap(): void {

    var map = L.map('map').setView([29.075, -110.95833333333334], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

  printExcelDF(file: File): void {

    //console.log(file.type);
    const validation = this.isValidFile(file.type);
    
    if (validation === 1) {
      
      dfd.readExcel(file).then((df: any) => {

        df.print();
      });
    } else if(validation === 2){

      dfd.readCSV(file).then((df: any) => {

        df.print();
      });
    }
    else {

      alert("Ocurrió un error, vuelva a intentarlo (se refreshea la página)");
    }
  }

  isValidFile(type: string): number{

    if(type == this.TYPE_XLSX) 
      return 1;

    if(type == this.TYPE_CSV)
      return 2;

    return 0;
  }
}