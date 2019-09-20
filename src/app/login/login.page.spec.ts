import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'; 

import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SurveyService } from '../survey.service';

class RouterStub {
  navigate() {}
  }

class SurveyServiceStub {
  user: any = new BehaviorSubject(null);
  }

class ActivatedRouteStub {
  }

describe('LoginPage', () => {
  let component;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: SurveyService, useClass: SurveyServiceStub} ,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
      ],
      imports: [ ReactiveFormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    
  });

  it('should create a LogInForm with two (2) controls', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    expect('loginForm').toBeTruthy;
    expect(component.loginForm.contains('username').toBeTruthy);
    expect(component.loginForm.contains('password').toBeTruthy);
    expect().nothing();
  })

  it('should make the Username required', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('')
    expect(control.valid).toBeFalsy;
    expect().nothing();
  })

  it('should prompt a message when Username is blank', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue(null)
    spyOn(window, "alert");
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith("Kindly input Username.");
  })

  it('should prompt a message when password is null', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Sharmaine');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue(null)
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Kindly input Password.');
  })

  it('should prompt a message when username or password is invalid', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Test');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue('This');
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Invalid Username or Password.')
  })

  it('should navigate to Survey List Page on valid Username, and Password', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Sharmaine');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue('123456');

    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith([ './survey-list' ]);
  })

  it('should set the Subject "user" to true on valid Username, and Password', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Sharmaine');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue('123456');
    component.onSubmit();

    let surveyService = TestBed.get(SurveyService);
    surveyService.user.subscribe((user) => {
    expect(user).toBe(true);
    expect().nothing();
    })
  })


});
