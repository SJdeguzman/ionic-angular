import { Injectable} from '@angular/core';
import { AngularFireDatabase, } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Survey } from './survey.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
surveys: Survey[]=[];
surveysChanged = new Subject<Survey[]>();
user = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase,
              private http : HttpClient,
              private router: Router) { }
  
create(survey){
  return this.db.list ('/surveys').push(survey);
 }

get(surveyId){
   return this.db.object('/surveys/' + surveyId);
 }
update (surveyId, survey){
   return this.db.object('/surveys/' + surveyId).update(survey);
 }
delete(key){
   return this.db.object('/surveys/' + key).remove();
 }

//<!-----------Different Approach---------->

 fetchSurveys(){
  return this.http.get<Survey[]>('https://ionic-1e377.firebaseio.com/surveys.json')
      .pipe (
        map ( responseData =>{
          const postArray: Survey[] = [];
          for (const key in responseData){
          if (responseData.hasOwnProperty (key)){
            postArray.push({ ...responseData[key], id: key});
          }
          }return postArray;
        } 
        )
      )  
     .subscribe(posts =>{
        this.surveys = posts;
        this.surveysChanged.next(this.surveys.slice());
      })
   }

  fetch(){
    return this.http.get<Survey[]>('https://ionic-1e377.firebaseio.com/surveys.json')  
    
  }

  logout(){
    this.user.next(false);
    this.router.navigate(['/login'])
  }
}
