import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReportPage } from './survey-report.page';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';



describe('SurveyReport', () => {
  let component;
  let fixture: ComponentFixture<SurveyReportPage>;

beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  TestBed.configureTestingModule({
    declarations: [SurveyReportPage ],
  
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  
});
   
 
});
