import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ShoppingItem } from '../models/shoppingItem.model';
import { ShoppingItemService } from '../shoppingitem.service';
import { ShoppingitemDeleteComponent } from "./shoppingitem-delete/shoppingitem-delete.component";

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  public isAdd = false;
  public gegenstand = '';
  public shoppingList = new MatTableDataSource<ShoppingItem>();
  public isEmpty = false;
  public displayedColumns: string[] = ['menge', 'einheit', 'name', 'delete'];
  public menge = 0;
  public einheit = '';

  constructor(private router: Router,
    private readonly shoppingItemService: ShoppingItemService,
    private readonly dialog: MatDialog,
    private _snackBar: MatSnackBar) { };

  async ngOnInit() {
    this.shoppingList.data = await this.shoppingItemService.getAll();
  }

  public add() {
    this.isAdd = !this.isAdd;
  }

  public async save() {
    if (this.gegenstand !== '' && this.einheit !== '') {
      const a = await this.shoppingItemService.decide({ 'menge': this.menge, 'einheit': this.einheit, 'name': this.gegenstand });
      this.shoppingList.data = a;
      this.gegenstand = '';
      this.einheit = '';
      this.menge = 0;
      this.isAdd = false;
      this.isEmpty = false;
      this._snackBar.open("Sucessful", "Added", {
        duration: 2000,
      })
    } else {
      this._snackBar.open("Angaben incomplete", "Error", {
        duration: 2000,
      })
    }
  }


  public async delete(data) {
    await this.shoppingItemService.delete(data.id);
    this.shoppingList.data = this.shoppingList.data.filter(d => d.id !== data.id)
    if (this.shoppingList.data.length == 0) {
      this.isEmpty = true;
    }
  }

  public async deleteAll() {
    await this.dialog.open(ShoppingitemDeleteComponent)
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.shoppingList.data.forEach(element => {
            this.shoppingItemService.delete(element.id);
            this.shoppingList.data = this.shoppingList.data.filter(d => d.id !== element.id);
          });
        }
      });
    if (this.shoppingList.data.length == 0) {
      this.isEmpty = true;
    }
  }

  public applyFilter(filterValue: string) {
    this.shoppingList.filter = filterValue.trim().toLowerCase();
  }


}

