import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from '../../question.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent {

  public input: string;
  public output: string;
  public angabe: string;
  public angaben: string[];
  public anleitung: string;
  public emptyAngaben = true;

  constructor(
    private readonly dialogRef: MatDialogRef<QuestionAddComponent>,
    private readonly questionService: QuestionService
  ) { }

  public addAngabe() {
    this.angaben = [...this.angaben, this.angabe];
    this.emptyAngaben = false;
    this.angabe = '';
  }
  public async add() {
    if (this.input != '' && this.output != '' && this.angaben != null && this.anleitung != '') {
      this.angaben = [...this.angaben, this.angabe];
      let question = new Question({ input: this.input, output: this.output, angaben: this.angaben, anleitung: this.anleitung })
      const q = await this.questionService.create({
        input: this.input,
        output: this.output,
        angaben: this.angaben,
        anleitung: this.anleitung
      });
      this.dialogRef.close(question);
    } else {
      this.dialogRef.close(null);
    }
  }

}
