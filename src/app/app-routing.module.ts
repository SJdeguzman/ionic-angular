import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'survey-list', loadChildren: './survey-list/survey-list.module#SurveyListPageModule'  },
  { path: 'survey-form', loadChildren: './survey-form/survey-form.module#SurveyFormPageModule' },
  { path: 'survey-report', loadChildren: './survey-report/survey-report.module#SurveyReportPageModule' },
  { path: 'survey-form/:id', loadChildren: './survey-form/survey-form.module#SurveyFormPageModule' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
