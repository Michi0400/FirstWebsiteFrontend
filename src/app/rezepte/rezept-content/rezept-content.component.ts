import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Angabe } from '../../models/angabe.model';
import { Rezept } from '../../models/rezept.model';
import { RezeptService } from '../../rezept.service';
import { ShoppingItemService } from '../../shoppingitem.service';

@Component({
  selector: 'app-rezepte-content',
  templateUrl: './rezept-content.component.html',
  styleUrls: ['./rezept-content.component.css']
})
export class RezeptContentComponent implements OnInit {

  public data: Rezept;
  private routeSub: Subscription;
  private helpId;
  public helpAngaben: Angabe[];
  public helpAnleitung: string;
  public helpName: string;
  public displayedColumns: string[] = ['menge', 'einheit', 'angabe', 'add'];

  constructor(private _location: Location,
    private readonly rezeptService: RezeptService,
    private route: ActivatedRoute,
    private readonly shoppingItemService: ShoppingItemService,
    private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.helpId = params['id'];
    });
    this.data = await this.rezeptService.getOne(this.helpId);
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
    this._snackBar.open("Sucessful", "Added", {
      duration: 2000,
    });
  }
}
