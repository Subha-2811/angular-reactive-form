import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // Creating Form Using FormGroup and FormControl
  registrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl(''),
    }),
  });

  loadApiData() {
    // setValue() is strict and only allows us to add data if the structure completely matches

    // this.registrationForm.setValue({
    //   username: 'Subha',
    //   password: 'test',
    //   confirmPassword: 'test',
    //   address: {
    //     city: 'Jamshedpur',
    //     state: 'Jharkhand',
    //     postalCode: '831012',
    //   },
    // });

    // If we need to add few of the fields then we can use patchValue() 

    this.registrationForm.patchValue({
      username: 'Subha',
      password: 'test',
      confirmPassword: 'test'
    });
  }
}
