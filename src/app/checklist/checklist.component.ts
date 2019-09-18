import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { Question } from "../models/question.model";
import { QuestionEditComponent } from '../question-edit/question-edit.component';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  public newInput = '';
  public newOutput = '';
  public trainingData: Question[] = [
  ];
  public displayedColumns: string[] = ['index', 'input', 'output', 'delete', 'edit'];
  public isEmpty = false;
  public editing = false;
  public helpId: string;

  constructor(private router: Router, private readonly questionService: QuestionService, private readonly dialog: MatDialog) { };

  async ngOnInit() {
    this.trainingData = await this.questionService.getAll();
  }

  public async lernWas() {
    if (this.newInput != '' && this.newOutput != '') {
      const q = await this.questionService.create({
        input: this.newInput,
        output: this.newOutput
      });
      this.trainingData = [...this.trainingData, q]
      this.newInput = ''
      this.newOutput = ''
      this.isEmpty = false;
    }
  }
  public async delete(data: any) {
    await this.questionService.delete(data.id);
    this.trainingData = this.trainingData.filter(d => d.id !== data.id)
    if (this.trainingData.length == 0) {
      this.isEmpty = true;
    }
  }

  public goToChecklist() {
    this.router.navigateByUrl('/checklist');
  }

  public goToShoppinglist() {
    this.router.navigateByUrl('/shoppinglist');
  }

  public async deleteAll(data: any) {
    await data.forEach(element => {
      this.questionService.delete(element.id);
      this.trainingData = this.trainingData.filter(d => d.id !== element.id);
    });
    if (this.trainingData.length == 0) {
      this.isEmpty = true;
    }
  }

  public edit(data: Question) {
    this.dialog.open(QuestionEditComponent, {
      data
    });
  }
}
