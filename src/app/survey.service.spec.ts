import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SurveyService } from './survey.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
class RouterStub {
  navigate() {}
}
class SurveyServiceStub{

}

describe('SurveyService', () => {
  let component;
  let fixture: ComponentFixture<SurveyService >;

beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  TestBed.configureTestingModule({
    declarations: [  ],
    providers: [
      {provide: Router, useClass: RouterStub},
      {provide: SurveyService, useClass: SurveyServiceStub}
    ],
    imports: [ ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
});

  it('should be created', () => {
    const service: SurveyService = TestBed.get(SurveyService);
    expect('service').toBeTruthy();
  });
});
