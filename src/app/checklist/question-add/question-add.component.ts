import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Angabe } from '../../../app/models/angabe.model';
import { QuestionService } from '../../question.service';


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements AfterViewInit {

  @ViewChild('angabe', { static: false })
  private angabeInput: ElementRef<HTMLInputElement>

  public name: string = "";
  public description: string = "";
  public angabeStr: string = "";
  public angaben: Angabe[] = [];
  public anleitung: string = "";
  public emptyAngaben = true;
  public angabe$: Observable<any>;
  public helpOptions: Angabe[] = [];
  public helpId: string = "";

  constructor(
    private readonly dialogRef: MatDialogRef<QuestionAddComponent>,
    private readonly questionService: QuestionService
  ) { }

  ngAfterViewInit(): void {
    this.angabe$ = fromEvent(this.angabeInput.nativeElement, 'input')
      .pipe(
        //takeUntil(this),
        debounceTime(500),
        distinctUntilChanged(),
        map(e => (e.target as HTMLInputElement).value)
      )
    this.angabe$.subscribe(async val => {
      const res = await this.questionService.queryAnlage(val);
      this.helpOptions = res;
    })
  }

  public addAngabe() {
    this.angaben.push(new Angabe({ id: this.helpId, name: this.angabeStr }));
    this.emptyAngaben = false;
    this.angabeStr = '';
    this.helpId = '';
  }
  public async add() {
    if (this.angabeStr.trim() !== '') {
      this.angaben.push(new Angabe({ id: this.helpId, name: this.angabeStr }));
    }
    if (this.name.trim() !== '' && this.description.trim() !== '' && this.angaben.length !== 0 && this.anleitung.trim() !== '') {
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
