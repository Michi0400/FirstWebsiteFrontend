import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { angularMaterial } from '../../angular-material';
import { QuestionService } from '../question.service';
import { ChecklistComponent } from './checklist.component';
import { QuestionDeleteComponent } from "./question-delete/question-delete.component";
import { QuestionEditComponent } from './question-edit/question-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ChecklistComponent
  }
]

@NgModule({
  declarations: [
    ChecklistComponent,
    QuestionEditComponent,
    QuestionDeleteComponent
  ],
  imports: [
    CommonModule,
    angularMaterial,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [QuestionService],
  entryComponents: [QuestionEditComponent, QuestionDeleteComponent]
})
export class ChecklistModule { }
