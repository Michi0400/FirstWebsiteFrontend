import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Angabe } from 'src/app/models/angabe.model';
import { IQuestion } from 'src/app/models/question.model';
import { QuestionService } from '../../question.service';


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements AfterViewInit, OnDestroy {

  @ViewChild('angabe', { static: false })
  private angabeInput: ElementRef<HTMLInputElement>

  public question: Partial<IQuestion> = {};

  public angabeStr: string = '';
  public angabe$: Observable<any>;
  public helpOptions: Angabe[] = [];
  public helpId: string = '';
  public completeAngabe: Angabe[] = [];
  public displayedColumns: string[] = ['menge', 'einheit', 'angabe', 'add'];
  public menge: number = 0;
  public einheit: string = '';
  public isEmpty = true;

  constructor(
    private readonly dialogRef: MatDialogRef<QuestionAddComponent>,
    private readonly questionService: QuestionService
  ) { }

  ngAfterViewInit(): void {
    this.angabe$ = fromEvent(this.angabeInput.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(e => (e.target as HTMLInputElement).value)
      )
    this.angabe$.subscribe(async val => {
      this.helpOptions = await this.questionService.queryAnlage(val);
    })
  }

  ngOnDestroy(): void {
    if (this.isEmpty) {
      this.dialogRef.close(null)
    }
  }

  public addAngabe() {
    this.completeAngabe = [...this.completeAngabe, (new Angabe({ menge: this.menge, einheit: this.einheit, id: this.helpId, name: this.angabeStr }))];
    this.angabeStr = '';
    this.helpId = '';
    this.einheit = '';
    this.menge = 0;
  }

  public async add() {
    if (this.angabeStr.trim() !== '') {
      this.completeAngabe = [...this.completeAngabe, (new Angabe({ menge: this.menge, einheit: this.einheit, id: this.helpId, name: this.angabeStr }))];
    }
    if (this.question.name.trim() !== '' && this.question.description.trim() !== '' && this.completeAngabe.length !== 0 && this.question.anleitung.trim() !== '') {
      this.isEmpty = false
      const q = await this.questionService.create({
        name: this.question.name,
        description: this.question.description,
        angaben: this.completeAngabe,
        anleitung: this.question.anleitung
      });
      this.dialogRef.close(q);
    } else {
      this.dialogRef.close(null);
    }
  }

  public save(angabe: Angabe, event: Event) {
    this.helpId = angabe.id;
    this.angabeStr = angabe.name;
  }

}
