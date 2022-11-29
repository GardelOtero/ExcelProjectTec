import { Injectable } from '@angular/core';
import * as dfd from "danfojs";
import * as L from 'leaflet';
import axios from 'axios';
import { DataFrame } from 'danfojs/dist/danfojs-base';
import * as coordParser from 'coordinate-parser';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { 
    console.log("This is app Service Constructor");
  }
  //******************************** VARIABLES ********************************** */
  //Security layer if html is modified
  TYPE_XLSX: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  TYPE_CSV: string = "text/csv";

  information: DataFrame | undefined; //data frame storer

  //List of polygons in leaflet map
  geojsonFeatureCollection: GeoJSON.FeatureCollection = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "Name": "Example"
        },
        "geometry": {
          "coordinates": [
            [
              [
                -110.95196325306112,
                29.103148423862137
              ],
              [
                -110.95787299932549,
                29.09924695253642
              ],
              [
                -110.94802342221828,
                29.097640421363607
              ],
              [
                -110.95458980695642,
                29.087312122390216
              ],
              [
                -110.94552819601766,
                29.093164952334106
              ],
              [
                -110.94329562520673,
                29.100164959093064
              ],
              [
                -110.94355828059611,
                29.104754869073346
              ],
              [
                -110.95196325306112,
                29.103148423862137
              ]
            ]
          ],
          "type": "Polygon"
        }
      }
    ]
  }

  //******************************** FUNCIONES AUXILIARES ********************************** */

  isValidPosition = function(position: string) {
    var error;
    var isValid;
    try {
      isValid = true;
      new coordParser(position);
      return isValid;
    } catch (error) {
      console.log(error);
      isValid = false;
      return isValid;
    }
  };

  isValidFile(type: string): number{

    if(type == this.TYPE_XLSX) 
      return 1;

    if(type == this.TYPE_CSV)
      return 2;

    return 0;
  }
  
  //******************************** FUNCIONES ********************************** */

  startMap(): void {

    var map = L.map('map').setView([29.075, -110.95833333333334], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var polygonLayer = L.geoJSON().addTo(map);
    polygonLayer.addData(this.geojsonFeatureCollection);
    
    console.log("GeoJson dibujado:");
    console.log(this.geojsonFeatureCollection);
  }

  readInfoToDF(file: File): void {

    //console.log(file.type);
    const validation = this.isValidFile(file.type);
    
    if (validation === 1) {

      dfd.readExcel(file)
      .then((df: any) => {this.information = df}) //the data is saved in information
      .finally(() => {
        if (this.information != undefined) {
          this.information.print();
          this.analyzeContentDF();
        }});
    } else if(validation === 2){
      
      dfd.readCSV(file)
      .then((df: any) => {this.information = df}) //the data is saved in information
      .finally(() => {
        if (this.information != undefined) {
          this.information.print();
          this.analyzeContentDF();
        }});
    }
    else {

      alert("Ocurrió un error, vuelva a intentarlo (se refreshea la página)");
    }
  }

  analyzeContentDF(): void {

    if (this.information != undefined) {

      // const result = dfd.toJSON(this.information, {
      //   format: "row",
      // });

      // console.log(result);
      const coords = this.information.at(0, "COORDENADAS")?.toString();
      console.log(coords);

      const splittedCoords = coords?.toString().split(" ")
      console.log(splittedCoords);

      splittedCoords?.forEach(coordinate => {
        console.log(this.isValidPosition(coordinate));
      });
    }
  }

  testAxiosGet(id: number): void{
    axios.get('https://rickandmortyapi.com/api/character/' + id)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            console.log('Esto se ejecuta siempre, haya habido error o no');
          });
  }
}