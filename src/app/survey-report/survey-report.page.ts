import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Subscription } from 'rxjs';
declare var zingchart: any;

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.page.html',
  styleUrls: ['./survey-report.page.scss'],
})
export class SurveyReportPage implements OnInit, OnDestroy {

  user: any;
  surveySubscription: Subscription ;
  surveyList = [];
  surveyListCondition: boolean;

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveySubscription = this.surveyService.fetch()
    .subscribe((response: any) => {
      if(response === null) {
        this.surveyList = [];
        this.surveyListCondition = true;
      } else {
          this.surveyList = Object.values(response);
          this.chartOne(this.questionOne());
          this.chartTwo(this.questionTwo());
          this.chartThree(this.questionThree());
          this.chartFour(this.questionFour());
        }
      })

    this.surveyService.user
    .subscribe(
      (user : any) =>{
        this.user = user;
          }
      )
   
 
  }

  ngOnDestroy() {
    this.surveySubscription.unsubscribe();
  }

  questionOne() {
    let i = 0, yes = 0, no = 0;
    let oneVal = {
      yes: 0,
      no: 0,
    }
    for(i=0; i< this.surveyList.length; i++){
      if (this.surveyList[i].one === "yes") {
        yes = yes + 1;
      }
     else {
        no= no + 1;
      }
     }
     oneVal.yes = yes;
     oneVal.no= no;
     return oneVal;
  }

  questionTwo() {
    let i = 0, Excellent = 0, Good = 0, Average = 0, Poor = 0,  Extremely_Poor = 0;
    let twoVal= {
      Excellent: 0,
      Good: 0,
      Average: 0,
      Poor: 0,
      Extremely_Poor: 0,
    }
    for(i=0; i< this.surveyList.length; i++) {
      if(this.surveyList[i].two === 'Excellent') {
        Excellent = Excellent + 1;
      } else if(this.surveyList[i].two === 'Good') {
        Good = Good + 1;
      } else if(this.surveyList[i].two === 'Average') {
        Average = Average + 1;
      } else if(this.surveyList[i].two === 'Poor') {
        Poor = Poor + 1;
      } else {
        Extremely_Poor = Extremely_Poor + 1;
       
      }
    }

    twoVal.Excellent = Excellent;
    twoVal.Good = Good;
    twoVal.Average = Average;
    twoVal.Poor = Poor;
    twoVal.Extremely_Poor = Extremely_Poor;
    return twoVal;
  }
  

  questionThree() {
    let i = 0, Extremely_Satisfied= 0, Satisfied=0, Neutral=0, Dissatisfied=0, Extremely_Dissatisfied=0;
      let threeVal = {
        Extremely_Satisfied: 0,
        Satisfied: 0,
        Neutral: 0,
        Dissatisfied: 0,
        Extremely_Dissatisfied: 0
  
      }
    for (i=0; i< this.surveyList.length; i++) {
      if(this.surveyList[i].three === "Extremely Satisfied") {
        Extremely_Satisfied =  Extremely_Satisfied+ 1;
      } else if(this.surveyList[i].three  === "Satisfied") {
        Satisfied = Satisfied + 1;
      } else if(this.surveyList[i].three   === "Neutral") {
        Neutral = Neutral + 1;
      } else if(this.surveyList[i].three  === "Dissatisfied") {
        Dissatisfied= Dissatisfied + 1;
      } else {
        Extremely_Dissatisfied = Extremely_Dissatisfied + 1;
      }
    }

    threeVal.Extremely_Satisfied= Extremely_Satisfied;
    threeVal.Satisfied = Satisfied
    threeVal.Neutral = Neutral ;
    threeVal.Dissatisfied=Dissatisfied;
    threeVal.Extremely_Dissatisfied = Extremely_Dissatisfied;
    return threeVal;
  }


  questionFour() {
    let i = 0, Very_Good = 0, Good = 0, Fair= 0, Poor = 0, Very_Poor=0;
    let fourVal = {
      Very_Good: 0,
      Good: 0,
      Fair: 0,
      Poor: 0,
      Very_Poor: 0

    }
    for (i=0; i< this.surveyList.length; i++) {
      if(this.surveyList[i].four === 'Very Good') {
        Very_Good = Very_Good + 1;
      } else if(this.surveyList[i].four  === 'Good') {
        Good = Good + 1;
      } else if(this.surveyList[i].four  === 'Fair') {
        Fair = Fair + 1;
      } else if(this.surveyList[i].four === 'Poor') {
        Poor = Poor + 1;
      } else {
        Very_Poor =  Very_Poor + 1;
      }
    }

    fourVal.Very_Good= Very_Good;
    fourVal.Good = Good;
    fourVal.Fair= Fair;
    fourVal.Poor= Poor;
    fourVal.Very_Poor =  Very_Poor;
    return fourVal;
  }


  chartOne( oneVal: any) {
    var chartData = {
      type: 'bar',  
      plotarea: {
        height: '100%'
      },
      gui: {
        contextMenu: {
          button: {
            visible: false
          }
        }
      },
      mediaRules: [
        {
          maxWidth: 500,
          fontSize: '10',
          height: '100%',
        }
      ],
      title: {
        text: "1. Have you ever buy a product from SBshoes Company ?", 
        adjustLayout: true,
        mediaRules: [
          {
            maxWidth: 500,
            fontSize: '12',
            wrapText: true
          }
        ]
      },
      legend: {
        draggable: true,
        visible: false
      }, 
      scaleX: {

        labels: [
          "Yes",
          "No",
        ],
        item: {
          mediaRules: [
            {
              maxWidth: 500,
              fontSize: '10',
              angle: '45'
            }
          ]
        }
      },
      series: [  
        { values: [
          oneVal.yes,
          oneVal.no,
        ],
        backgroundColor: '#e75480',
      },
      ]
    };
     
    zingchart.render({ 
      id: 'question1Chart',
      data: chartData,
      height: 350,
      width: '400'
    });
  }

  chartTwo(twoVal: any) {
    var chartData = {
      type: 'bar', 
      plotarea: {
        height: '100%',
        marginBottom: 'dynamic'
      },
      gui: {
        contextMenu: {
          button: {
            visible: false
          }
        }
      },
      mediaRules: [
        {
          maxWidth: 500,
          fontSize: '10',
          height: '100%',
        }
      ],      
      title: {
        text: "2. All in all, how would you rate SBshoes Company ?",
        mediaRules: [
          {
            maxWidth: 500,
            fontSize: '12',
            wrapText: true
          }
        ] 
      },
      legend: {
        draggable: true,
        visible: false
      }, 
      scaleX: {
       
        labels: [
          "Excellent",
          "Good",
          "Average",
          "Poor",
          "Extremely Poor"
        ],
        item: {
          mediaRules: [
            {
              maxWidth: 500,
              fontSize: '10',
              angle: '45'
            }
          ]
        }
      },
      series: [  
        { values: [
          twoVal.Excellent,
          twoVal.Good,
          twoVal.Average,
          twoVal.Poor,
          twoVal.Extremely_Poor,
        ],
        backgroundColor: '#e75480'
      },
      ]
    };
     
    zingchart.render({ 
      id: 'question2Chart',
      data: chartData,
      height: 350,
      width: '400'
    });
  }

  chartFour( fourVal: any) {
    var chartData = {
      type: 'bar',  
      plotarea: {
        height: '100%',
        marginBottom: 'dynamic'
      },
      gui: {
        contextMenu: {
          button: {
            visible: false
          }
        }
      },
      mediaRules: [
        {
          maxWidth: 500,
          fontSize: '10',
          height: '100%',
        }
      ],      
      title: {
        text: "4.How would you rate the new designed shoes of the SBshoes Company ? ",
        mediaRules: [
          {
            maxWidth: 500,
            fontSize: '12',
            wrapText: true
          }
        ] 
      },
      legend: {
        draggable: true,
        visible: false
      }, 
      scaleX: {
        
        labels: [
      
          "Very Good",
          "Good",
          "Fair",
          "Poor",
          "Very Poor"
        ],
        item: {
          mediaRules: [
            {
              maxWidth: 500,
              fontSize: '10',
              angle: '45'
            }
          ]
        }
      },
      series: [  
        { values: [
          fourVal.Very_Good,
          fourVal.Good,
          fourVal.Fair,
          fourVal.Poor,
          fourVal.Very_Poor,
        ],
        backgroundColor: '#e75480'
      },
      ]
    };
     
    zingchart.render({ 
      id: 'question4Chart',
      data: chartData,
      height: 350,
      width: '400'
    });
  }
  
  chartThree(threeVal: any) {
    var chartData = {
      type: 'bar', 
      gui: {
        contextMenu: {
          button: {
            visible: false
          }
        }
      },
      mediaRules: [
        {
          maxWidth: 500,
          fontSize: '10',
          height: '100%',
        }
      ],
      title: {
        text: "3. Rate your overall satisfaction with the products you used from SBshoes Company?", 
        mediaRules: [
          {
            maxWidth: 500,
            fontSize: '12',
            wrapText: true
          }
        ]
      },
      legend: {
        draggable: true,
        visible: false
      }, 
      scaleX: {
        
        labels: [
          "Extremely Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Extremely Dissatisfied"
        ],
        item: {
          mediaRules: [
            {
              maxWidth: 500,
              fontSize: '10',
              angle: '45'
            }
          ]
        }
      },
      series: [ 
        { values: [
          threeVal.Extremely_Satisfied ,
          threeVal.Satisfied,
          threeVal.Neutral,
          threeVal.Dissatisfied,
          threeVal.Extremely_Dissatisfied ,
        ],
        backgroundColor: '#e75480'
      },
      ]
    };
     
    zingchart.render({ 
      id: 'question3Chart',
      data: chartData,
      height: 350,
      width: '400'
    });
  }



}
