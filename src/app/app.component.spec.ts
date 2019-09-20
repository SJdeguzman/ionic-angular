import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SurveyService } from './survey.service';
import { Subject, BehaviorSubject } from 'rxjs';


class RouterStub {
  navigate() {}
}
class SurveyServiceStub{
  user = new BehaviorSubject(null);
  
  logout (){
    this.user.next(false)
  }
}
 class AppComponentStub{
}

describe('AppComponent', () => {
  let component;
  let fixture: ComponentFixture<AppComponent>;
  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
  
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        {provide: Router, useClass: RouterStub},
        {provide: SurveyService, useClass: SurveyServiceStub},
        {provide: AppComponent, useClass: AppComponentStub},

      ],
    }).compileComponents();
  }));
  beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });


  it('should set the Subject "user" to false on logOut', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.logout();

    const surveyService = TestBed.get(SurveyService);
    surveyService.user.subscribe(user => {
    expect().nothing();
    expect(user).toBeFalsy;
      
    })
  })


});