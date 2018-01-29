import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.registerForm = this.formBuilder.group({
      employeeName : ['', Validators.compose([
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(30),
      ])],
      employeeNumber : ['', Validators.required],
      employeePassword : ['', Validators.required],
      employeeDesignation : ['', Validators.required],
      employeeServiceLine : ['', Validators.required],
      employeeRole : ['', Validators.required]
    });
  }

}
