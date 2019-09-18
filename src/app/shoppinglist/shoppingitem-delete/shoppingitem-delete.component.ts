import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shoppinglist-delete',
  templateUrl: './shoppingitem-delete.component.html',
  styleUrls: ['./shoppingitem-delete.component.css']
})
export class ShoppingitemDeleteComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<ShoppingitemDeleteComponent>,
  ) { }


  public async deleteAll() {
    this.dialogRef.close(true)
  }

  public cancle() {
    this.dialogRef.close(false);
  }

}
