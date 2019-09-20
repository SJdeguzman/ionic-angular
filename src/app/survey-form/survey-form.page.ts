import { Component } from '@angular/core';
import { SurveyService } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  NgForm } from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.page.html',
  styleUrls: ['./survey-form.page.scss'],
})
export class SurveyFormPage {
 user;
 survey={};
 dateAndTime = '';
 id;
 

  constructor( private surveyService:SurveyService,
               private route: ActivatedRoute,
               private router: Router){
              
              this.id = this.route.snapshot.paramMap.get('id');
                if (this.id)  this.surveyService.get(this.id).valueChanges().subscribe(s => this.survey = s)
              }

     ngOnInit(){
      this.surveyService.user
      .subscribe(
        (user : any) =>{
            if (user == 1){
              this.user = true;
              }
            else 
              this.user = false;
            }
          )
      }         
     
  onGenerateDateAndTime() {
      const today = new Date();
      const date = today.toDateString();
      const time = today.toLocaleTimeString();
      this.dateAndTime= `${date} ${time}`;
    }

  save (survey){
    
    if (this.id ) {this.surveyService.update(this.id, survey)
        this.router.navigate(['/survey-list'])
      }
    else{
      this.surveyService.create(survey);
      window.alert('Your survey is successfully submitted.\nThank you for answering the survey.');
        if(this.user == true){
          this.router.navigate(['/survey-list'])
        }
        else if(this.user != true){
          this.router.navigate(['/login'])
        }
     } 
  }

  delete(){
    const confirmDeleteSurvey = confirm(`Are you sure you want to delete: This Survey?`);
      if (confirmDeleteSurvey === false) {
        return;
      }
      else {
        this.surveyService.delete(this.id);
        this.router.navigate(['/survey-list'])
      }
  }

  onClear(form:NgForm){
    form.reset();
  }

  cancel(){
     if(this.user != true){
      this.router.navigate(['/login'])
    }
  }
}
