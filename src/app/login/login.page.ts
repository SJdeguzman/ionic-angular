import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private surveyService: SurveyService) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
        })
     }
  

onSubmit(){

  if(this.loginForm.value['username'] === null) {
    window.alert('Kindly input Username.');
    return;
  }
  if(this.loginForm.value['password'] === null) {
    window.alert('Kindly input Password.');
    return;
  }
  if(this.loginForm.value['username'] != 'Sharmaine' 
    || this.loginForm.value['password'] != '123456') {
    window.alert('Invalid Username or Password.');
    return;
  }
 
  this.surveyService.user.next(true);
  this.router.navigate(['./survey-list']);
  }
  
}

 

