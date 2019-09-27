import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rezepte-delete',
  templateUrl: './rezept-delete.component.html',
  styleUrls: ['./rezept-delete.component.css']
})
export class RezeptDeleteComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<RezeptDeleteComponent>,
  ) { }


  public async deleteAll() {
    this.dialogRef.close(true)
  }

  public cancle() {
    this.dialogRef.close(false);
  }

}
