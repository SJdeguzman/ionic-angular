import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListPage } from './survey-list.page';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { SurveyService } from '../survey.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule,  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Survey } from '../survey.model';

class RouterStub {
  navigate() {}
  }

class SurveyServiceStub{
  user = new BehaviorSubject<any>(null);
  surveysChanged = new Subject<Survey[]>();

  fetchSurveys() {}
}

class ActivatedRouteStub{
  }

describe('SurveyList', () => {
  let component;
  let fixture: ComponentFixture<SurveyListPage>;

beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  TestBed.configureTestingModule({
    declarations: [SurveyListPage ],
    providers: [
      {provide: Router, useClass: RouterStub},
      {provide: SurveyService, useClass: SurveyServiceStub} ,
      {provide: ActivatedRoute, useClass: ActivatedRouteStub},
      
    ],
    imports: [ ReactiveFormsModule,  RouterTestingModule,],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  
});

it('should fetch the surveys', () => {
  fixture = TestBed.createComponent(SurveyListPage);
  component = fixture.componentInstance;
  
  const surveyService = TestBed.get(SurveyService);
  const spy = spyOn(surveyService, 'fetchSurveys');
  component.ngOnInit();
  expect(spy).toHaveBeenCalled();
})

});
