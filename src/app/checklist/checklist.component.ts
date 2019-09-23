import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { Question } from "../models/question.model";
import { QuestionService } from '../question.service';
import { QuestionAddComponent } from "./question-add/question-add.component";
import { QuestionDeleteComponent } from "./question-delete/question-delete.component";
import { QuestionEditComponent } from './question-edit/question-edit.component';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  public trainingData: Question[] = [
  ];
  public displayedColumns: string[] = ['index', 'input', 'output', 'delete', 'edit', 'link'];
  public isEmpty = false;
  public editing = false;
  public helpId: string;

  constructor(private router: Router, private readonly questionService: QuestionService, private readonly dialog: MatDialog) { };

  async ngOnInit() {
    this.trainingData = await this.questionService.getAll();
  }

  public async add() {
    this.isEmpty = false;
    this.dialog.open(QuestionAddComponent)
      .afterClosed()
      .subscribe(response => {
        if (response != null) {
          this.trainingData = [...this.trainingData, response]
        }
      })
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

  public async deleteAll(data: Question[]) {
    await this.dialog.open(QuestionDeleteComponent)
      .afterClosed()
      .subscribe(response => {
        if (response) {
          data.forEach(element => {
            this.questionService.delete(element.id);
            this.trainingData = this.trainingData.filter(d => d.id !== element.id);
          });
        }
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
