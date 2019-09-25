import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Angabe } from 'src/app/models/angabe.model';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/question.service';
import { ShoppingItemService } from 'src/app/shoppingitem.service';

@Component({
  selector: 'app-checklist-content',
  templateUrl: './checklist-content.component.html',
  styleUrls: ['./checklist-content.component.css']
})
export class ChecklistContentComponent implements OnInit {

  public data: Question;
  private routeSub: Subscription;
  private helpId;
  public helpAngaben: Angabe[];
  public helpAnleitung: string;
  public helpName: string;
  public displayedColumns: string[] = ['angabe', 'add'];

  constructor(private _location: Location,
    private readonly questionService: QuestionService,
    private route: ActivatedRoute,
    private readonly shoppingItemService: ShoppingItemService) { }

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.helpId = params['id'];
    });
    this.data = await this.questionService.getOne(this.helpId);
    this.helpAngaben = this.data.angaben;
    this.helpAnleitung = this.data.anleitung;
    this.helpName = this.data.name;
  }

  public goBack() {
    this._location.back();
  }

  public async addToShoppinglist(name: string) {
    const q = await this.shoppingItemService.create({
      name: name
    });
  }



}
