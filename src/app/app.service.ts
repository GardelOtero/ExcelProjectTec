import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { 
    console.log("This is app Service Constructor");
  }

  users: any[] = []

  // a simple test method
  testMethod(): string {
    return "Returning a string from testMethod"
  }

  // fn to get all users from component
  getUsers() {
    return this.users
  }


  // add a single user
  addUser(user: any){
    return this.users.push(user)
  }
}