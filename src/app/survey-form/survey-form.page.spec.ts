import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyFormPage } from './survey-form.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SurveyService } from '../survey.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';


class RouterStub {
  navigate() {}
  }
class SurveyServiceStub{
  delete(){}

  update(){}

  create(){}
  }
class ActivatedRouteStub {
  }

describe('SurveyForm', () => {
  let component;
  let fixture: ComponentFixture<SurveyFormPage>;

beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  TestBed.configureTestingModule({
    declarations: [SurveyFormPage ],
    providers: [
      {provide: Router, useClass: RouterStub},
      {provide: ActivatedRoute, useClass: ActivatedRouteStub},
      {provide: SurveyService, useClass: SurveyServiceStub} ,
        {
            provide: ActivatedRoute,
            useValue: { snapshot: { paramMap: {get:(id:number)=>{id:1}}}}
        },     
    ],
    imports: [ ReactiveFormsModule, FormsModule, ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  
});

  it('should navigate to path: /login on cancel button', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.cancel();
    expect(spy).toHaveBeenCalledWith(['/login']);
  })

  it('should exit on Cancel on confirmation in window delete', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;

    spyOn(window, 'confirm').and.returnValue(false);
    const surveyService = TestBed.get(SurveyService);
    const spy = spyOn(surveyService, 'delete'); 
    component.delete();
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete: This Survey?');
    expect(spy).not.toHaveBeenCalled();
  })

  it('should delete the survey on Confirm in window delete', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    spyOn(window, 'confirm').and.returnValue(true);

    const surveyService = TestBed.get(SurveyService);
    const spy = spyOn(surveyService, 'delete');
    component.delete();
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete: This Survey?');
    expect(spy).toHaveBeenCalled();
  })

  it('should create a survey on valid form and prompt a message', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
  
    // component = new SurveyFormPage(null,null,null);
    // component.ngOnInit();
    // let controlName = component.f.get('name');
    // controlName.setValue('Sharmaine');
    // let emailControl = component.f.get('email');
    // emailControl.setValue('sharmain@gmail.com');
    // let oneControl = component.f.get('one');
    // oneControl.setValue('yes');
    // let twoControl = component.f.get('two');
    // twoControl.setValue('good');
    // let threeControl = component.f.get('three');
    // threeControl.setValue('satisfied');
    // let fourControl = component.f.get('four');
    // fourControl.setValue('satisfied');
    
    spyOn(window, 'alert');
    const surveyService = TestBed.get(SurveyService);
    const spy = spyOn(surveyService, 'create');
    component.save();
    expect(spy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Your survey is successfully submitted.\nThank you for answering the survey.')
  })

  it('should update  a survey ', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.id = 1; 
    const surveyService = TestBed.get(SurveyService);
    const spy = spyOn(surveyService, 'update');
    component.save();
    expect(spy).toHaveBeenCalled();
  })

  it('should navigate to path: /login when the form is submitted ', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.user = false;
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.save();
    expect(spy).toHaveBeenCalledWith(['/login']);
  })

  it('should navigate to path: /survey-list when the form is submitted and loged on', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.user= true;
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.save();
    expect(spy).toHaveBeenCalledWith(['/survey-list']);
  })
});
