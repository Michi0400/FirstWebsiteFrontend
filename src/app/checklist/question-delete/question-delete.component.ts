import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.css']
})
export class QuestionDeleteComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<QuestionDeleteComponent>,
  ) { }


  public async deleteAll() {
    this.dialogRef.close(true)
  }

  public cancle() {
    this.dialogRef.close(false);
  }

}
