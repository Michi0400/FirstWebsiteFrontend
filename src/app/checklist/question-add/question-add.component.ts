import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompleteAngabe } from 'src/app/models/completeAnlage.model';
import { Angabe } from '../../../app/models/angabe.model';
import { QuestionService } from '../../question.service';


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements AfterViewInit, OnDestroy {

  @ViewChild('angabe', { static: false })
  private angabeInput: ElementRef<HTMLInputElement>

  public name: string = '';
  public description: string = '';
  public angabeStr: string = '';
  public angaben: Angabe[] = [];
  public anleitung: string = '';
  public angabe$: Observable<any>;
  public helpOptions: Angabe[] = [];
  public helpId: string = '';
  public completeAngabe: CompleteAngabe[] = [];
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
      const res = await this.questionService.queryAnlage(val);
      this.helpOptions = res;
    })
  }

  ngOnDestroy(): void {
    if (this.isEmpty) {
      this.dialogRef.close(null)
    }

  }
  public addAngabe() {
    const newAngabe = new Angabe({ id: this.helpId, name: this.angabeStr });
    this.completeAngabe = [...this.completeAngabe, (new CompleteAngabe({ menge: this.menge, einheit: this.einheit, id: newAngabe.id, name: newAngabe.name }))];
    this.angaben.push(newAngabe);
    this.angabeStr = '';
    this.helpId = '';
    this.einheit = '';
    this.menge = 0;
  }
  public async add() {
    if (this.angabeStr.trim() !== '') {
      this.angaben.push(new Angabe({ id: this.helpId, name: this.angabeStr }));
    }
    if (this.name.trim() !== '' && this.description.trim() !== '' && this.angaben.length !== 0 && this.anleitung.trim() !== '') {
      this.isEmpty = false;
    }
    if (!this.isEmpty) {
      const q = await this.questionService.create({
        name: this.name,
        description: this.description,
        angaben: this.angaben,
        anleitung: this.anleitung
      });
      this.dialogRef.close(q);
    } else {
      this.dialogRef.close(null);
    }
  }

  public save(angabe: Angabe) {
    this.helpId = angabe.id;
    this.angabeStr = angabe.name;
  }

}
