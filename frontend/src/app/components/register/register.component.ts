import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ServicesService } from '../../services.service';
import { Router } from '@angular/router';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //matcher = new MyErrorStateMatcher();
  registerForm: FormGroup;
  empNameAvailable;
  empNameMessage;
  message;
  messageClass;
  processing = false;
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
    this.registerForm = this.formBuilder.group({
      employeeName : ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.validateEmployeeName
      ])],
      employeeNumber : ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        this.validateEmployeeNumber
      ])],
      employeePassword : ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.validateEmployeePassword
      ])],
      employeeDesignation : ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.validateEmployeeDesignation
      ])],
      employeeServiceLine : ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.validateEmployeeServiceLine
      ])],
      employeeRole : ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.validateEmployeeRole
      ])]
    });
  }
  //Validation of fields START
  validateEmployeeName(controls){
    const regExp = new RegExp(/^[a-zA-Z]+$/);
    if(regExp.test(controls.value)){
      return null;
    } else {
      return {'validateEmployeeName': true };
    }
  }

  validateEmployeeNumber(controls){
    const regExp = new RegExp(/^[0-9]+$/);
    if(regExp.test(controls.value)){
      return null;
    } else {
      return {'validateEmployeeNumber': true };
    }
  }

  validateEmployeePassword(controls){
   const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/);
   if(regExp.test(controls.value)){
     return null;
   } else {
     return {'validateEmployeePassword': true};
   }
 }

 validateEmployeeDesignation(controls){
   const regExp = new RegExp(/^[a-zA-Z]+$/);
   if(regExp.test(controls.value)){
     return null;
   } else {
     return {'validateEmployeeDesignation': true };
   }
 }

 validateEmployeeServiceLine(controls){
   const regExp = new RegExp(/^[a-zA-Z]+$/);
   if(regExp.test(controls.value)){
     return null;
   } else {
     return {'validateEmployeeServiceLine': true };
   }
 }

 validateEmployeeRole(controls){
   const regExp = new RegExp(/^[a-zA-Z]+$/);
   if(regExp.test(controls.value)){
     return null;
   } else {
     return {'validateEmployeeRole': true };
   }
 }
  //Validation of fields END
  diableForm(){
    this.registerForm.controls['employeeName'].disable();
    this.registerForm.controls['employeeNumber'].disable();
    this.registerForm.controls['employeePassword'].disable();
    this.registerForm.controls['employeeDesignation'].disable();
    this.registerForm.controls['employeeServiceLine'].disable();
    this.registerForm.controls['employeeRole'].disable();
  }
  enableForm(){
    this.registerForm.controls['employeeName'].enable();
    this.registerForm.controls['employeeNumber'].enable();
    this.registerForm.controls['employeePassword'].enable();
    this.registerForm.controls['employeeDesignation'].enable();
    this.registerForm.controls['employeeServiceLine'].enable();
    this.registerForm.controls['employeeRole'].enable();
  }
  onSubmit(){
    this.processing = true;
    this.diableForm();
    const employee = {
      employeeName: this.registerForm.get('employeeName').value,
      employeeNumber: this.registerForm.get('employeeNumber').value,
      employeePassword: this.registerForm.get('employeePassword').value,
      employeeDesignation: this.registerForm.get('employeeDesignation').value,
      employeeServiceLine: this.registerForm.get('employeeServiceLine').value,
      employeeRole: this.registerForm.get('employeeRole').value
    }
    this.authService.registereEmployee(employee).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
           this.router.navigate(['/login']);
         },2000);
      }
    });
  }
  checkEmployeeName(){
    const empName = this.registerForm.get('employeeName').value;
    this.authService.checkUserName(empName).subscribe(data => {
      if(!data.success){
          this.empNameAvailable = false;
          this.empNameMessage = data.message;
      } else {
        this.empNameAvailable = true;
        this.empNameMessage = data.message;
      }
    });
  }

}
