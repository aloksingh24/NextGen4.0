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
  processing = false;
  message;
  messageClass;
  constructor(
    private formBuilder: FormBuilder,
    private authService: ServicesService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm(){
    this.loginForm = this.formBuilder.group({
      employeeNumber : ['', Validators.required],
      employeePassword : ['', Validators.required],
    });
  }
  diableForm(){
    this.loginForm.controls['employeeNumber'].disable();
    this.loginForm.controls['employeePassword'].disable();
  }
  enableForm(){
    this.loginForm.controls['employeeNumber'].enable();
    this.loginForm.controls['employeePassword'].enable();
  }
  loginSubmit(){
    this.processing = false;
    this.diableForm();
    const employee = {
      employeeNumber: this.loginForm.get('employeeNumber').value,
      employeePassword: this.loginForm.get('employeePassword').value
    }
    this.authService.login(employee).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = true;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeEmpData(data.token, data.emp);
        setTimeout(() =>{
          this.router.navigate(['/dashboard']);
        },2000);
      }
    });
  }

}
