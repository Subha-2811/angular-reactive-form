import { Component } from '@angular/core';

// Creating Form Using FormBuilder
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';

// Creating Form Using FormGroup and FormControl
// import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Creating Form Using FormBuilder

  get username() {
    console.log(this.registrationForm.get('username'));
    return this.registrationForm.get('username');
  }

  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: [''],
      }),
    },
    { validator: PasswordValidator }
  );

  // Creating Form Using FormGroup and FormControl

  // registrationForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl(''),
  //   }),
  // });

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
      confirmPassword: 'test',
    });
  }
}
