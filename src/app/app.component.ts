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

  /*userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })

  users: any[] = []
  userCount = 0*/
  ngOnInit(): void {
    const val = this.appService.testMethod()
    //console.log("Value: ", val);
    const tf = dfd.tensorflow //get tensorflow lib from danfo
    let tensor_arr = tf.tensor([12,34,56,2])
    let s = new dfd.Series(tensor_arr)
    s.print()

    var map = L.map('map').setView([29.075, -110.95833333333334], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);



  }


 /* onSubmit() {
    const data = this.appService.addUser(this.userForm.value)
    this.userCount = this.userCount + 1
    this.userForm.reset()
  }

  getAllUsers() {
    this.users = this.appService.getUsers()
  }*/

}
