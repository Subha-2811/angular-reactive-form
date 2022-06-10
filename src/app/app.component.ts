import { Component } from '@angular/core';

// Creating Form Using FormBuilder
import { FormArray, FormBuilder, Validators } from '@angular/forms';

// Cross Validation
import { PasswordValidator } from './shared/password.validator';

// Creating Form Using FormGroup and FormControl
// import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  // Dynamic Forms
  get addresses() {
    return this.registrationForm.get('addresses') as FormArray;
  }

  // Creating Form Using FormBuilder

  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email]],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],

      // Dynamic Forms
      addresses: this.fb.array([this.initAddressModel()]),
    },
    { validator: PasswordValidator }
  );

  initAddressModel() {
    return this.fb.group({
      city: [''],
      state: [''],
      postalCode: [''],
    });
  }

  // Dynamic Forms
  addAddressRow() {
    this.addresses.push(this.initAddressModel());
  }

  deleteAddressRow(i: number) {
    this.addresses.removeAt(i);
  }

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

  ngOnInit() {
    // Conditional Validation
    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checked) => {
        if (checked) {
          this.email?.setValidators([Validators.required, Validators.email]);
        } else {
          this.email?.clearValidators();
          this.email?.setValidators([Validators.email]);
        }
        this.email?.updateValueAndValidity();
      });
  }

  loadApiData() {
    // setValue() is strict and only allows us to add data if the structure completely matches

    this.registrationForm.setValue({
      username: 'Subha',
      email: 'subhajyoti3845@gmail.com',
      subscribe: false,
      password: 'test',
      confirmPassword: 'test',
      addresses: [
        {
          city: 'Jamshedpur',
          state: 'Jharkhand',
          postalCode: '831012',
        },
      ],
    });

    // If we need to add few of the fields then we can use patchValue()

    // this.registrationForm.patchValue({
    //   username: 'Subha',
    //   password: 'test',
    //   confirmPassword: 'test',
    // });
  }
  onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationForm.reset();
  }
}
