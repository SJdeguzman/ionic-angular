import { Component ,OnInit} from '@angular/core';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey.model';


@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.page.html',
  styleUrls: ['./survey-list.page.scss'],
})
export class SurveyListPage implements OnInit {
surveys: Survey[];
user: any;
surveyListCondition: boolean;

constructor(private surveyService:SurveyService) {}

ngOnInit(){
  this.surveyService.fetchSurveys();
   this.surveyService.user
  .subscribe(
    (user : any) =>{
      if (user == 1){
        this.user = true;
        }
       }
     )
  
  this.surveyService.surveysChanged
   .subscribe(
     (surveys : Survey[]) =>{
       this.surveys = surveys;
        }
      )  
}

}
