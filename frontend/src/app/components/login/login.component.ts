import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ServicesService } from '../../services.service';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  createForm(){
    this.loginForm = this.formBuilder.group({
      employeeNumber : ['', Validators.required],
      employeePassword : ['', Validators.required],
    });
  }

}
