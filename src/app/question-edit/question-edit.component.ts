import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../models/question.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Question,
    private readonly dialogRef: MatDialogRef<QuestionEditComponent>,
    private readonly questionService: QuestionService
  ) { }

  public async update() {
    await this.questionService.update(this.data);
    this.dialogRef.close()
  }

}
