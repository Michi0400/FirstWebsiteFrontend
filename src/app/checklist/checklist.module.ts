import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { angularMaterial } from '../../angular-material';
import { QuestionService } from '../question.service';
import { ChecklistContentComponent } from './checklist-content/checklist-content.component';
import { ChecklistComponent } from './checklist.component';
import { QuestionAddComponent } from './question-add/question-add.component';
import { QuestionDeleteComponent } from "./question-delete/question-delete.component";
import { QuestionEditComponent } from './question-edit/question-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ChecklistComponent
  },
  {
    path: 'content/:id',
    component: ChecklistContentComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    ChecklistComponent,
    QuestionEditComponent,
    QuestionDeleteComponent,
    ChecklistContentComponent,
    QuestionAddComponent
  ],
  imports: [
    CommonModule,
    angularMaterial,
    FormsModule,
    RouterModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [QuestionService],
  entryComponents: [QuestionEditComponent, QuestionDeleteComponent, QuestionAddComponent]
})
export class ChecklistModule { }
