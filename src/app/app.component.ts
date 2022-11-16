import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'
import { FormGroup, FormControl, Validators} from '@angular/forms'


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
    console.log("Value: ", val);
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
