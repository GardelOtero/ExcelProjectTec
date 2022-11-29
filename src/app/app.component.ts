import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as dfd from "danfojs";
import * as L from 'leaflet';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ExcelProject';

  constructor(private appService: AppService) {}
  
  ngOnInit(): void {

    this.appService.startMap()
  }

  onChange(fileEvent: any): void{

    const file = fileEvent.target.files[0];

    //console.log(file);
    
    this.appService.printExcelDF(file);
  }
}
