import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Angabe } from '../../models/angabe.model';
import { IRezept } from '../../models/rezept.model';
import { RezeptService } from '../../rezept.service';


@Component({
  selector: 'app-rezepte-add',
  templateUrl: './rezept-add.component.html',
  styleUrls: ['./rezept-add.component.css']
})
export class RezeptAddComponent implements AfterViewInit, OnDestroy {

  @ViewChild('angabe', { static: false })
  private angabeInput: ElementRef<HTMLInputElement>

  public rezept: Partial<IRezept> = {};

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
    private readonly dialogRef: MatDialogRef<RezeptAddComponent>,
    private readonly rezeptService: RezeptService,
    private _snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.angabe$ = fromEvent(this.angabeInput.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(e => (e.target as HTMLInputElement).value)
      )
    this.angabe$.subscribe(async val => {
      this.helpOptions = await this.rezeptService.queryAnlage(val);
    })
  }

  ngOnDestroy(): void {
    if (this.isEmpty) {
      this.dialogRef.close(null)
    }
  }

  public addAngabe() {
    if (this.helpId !== '', this.angabeStr !== '', this.einheit !== '', this.menge !== 0) {
      this.completeAngabe = [...this.completeAngabe, (new Angabe({ menge: this.menge, einheit: this.einheit, id: this.helpId, name: this.angabeStr }))];
      this.angabeStr = '';
      this.helpId = '';
      this.einheit = '';
      this.menge = 0;
    } else {
      this._snackBar.open("Angaben not complete", "Error", {
        duration: 2000,
      })
    }
  }

  public async add() {
    if (this.angabeStr !== '') {
      this.completeAngabe = [...this.completeAngabe, (new Angabe({ menge: this.menge, einheit: this.einheit, id: this.helpId, name: this.angabeStr }))];
    }
    if (this.rezept.name !== '' && this.rezept.description !== '' && this.completeAngabe.length !== 0 && this.rezept.anleitung !== '') {
      this.isEmpty = false
      const r = await this.rezeptService.create({
        name: this.rezept.name,
        description: this.rezept.description,
        angaben: this.completeAngabe,
        anleitung: this.rezept.anleitung
      });
      this.dialogRef.close(r);
      this._snackBar.open("Sucessful", "Added", {
        duration: 2000,
      })
    } else {
      this._snackBar.open("Recept not complete", "Error", {
        duration: 2000,
      })
    }
  }

  public save(angabe: Angabe, event: Event) {
    this.helpId = angabe.id;
    this.angabeStr = angabe.name;
  }

}
