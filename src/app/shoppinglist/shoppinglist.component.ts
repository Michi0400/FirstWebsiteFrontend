import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  public newInput = '';
  public trainingData: ShoppingItem[] = [];
  public isEmpty = false;
  public displayedColumns: string[] = ['name', 'delete'];

  constructor(private router: Router, private readonly shoppingItemService: ShoppingItemService, private readonly dialog: MatDialog) { };

  async ngOnInit() {
    this.trainingData = await this.shoppingItemService.getAll();
  }

  public async add() {
    this.isAdd = !this.isAdd;
    if (!this.isAdd && this.newInput != '') {
      const q = await this.shoppingItemService.create({
        name: this.newInput,
      });
      this.trainingData = [...this.trainingData, q]
      this.newInput = '';
    }
    this.isEmpty = false;
  }
  public async delete(data) {
    await this.shoppingItemService.delete(data.id);
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
    await this.dialog.open(ShoppingitemDeleteComponent)
      .afterClosed()
      .subscribe(response => {
        if (response) {
          data.forEach(element => {
            this.shoppingItemService.delete(element.id);
            this.trainingData = this.trainingData.filter(d => d.id !== element.id);
          });
        }
      });
    if (this.trainingData.length == 0) {
      this.isEmpty = true;
    }
  }


}

