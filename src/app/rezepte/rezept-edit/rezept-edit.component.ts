import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rezept } from '../../models/rezept.model';
import { RezeptService } from '../../rezept.service';

@Component({
  selector: 'app-rezepte-edit',
  templateUrl: './rezept-edit.component.html',
  styleUrls: ['./rezept-edit.component.css']
})
export class RezeptEditComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Rezept,
    private readonly dialogRef: MatDialogRef<RezeptEditComponent>,
    private readonly rezeptService: RezeptService
  ) { }

  public async update() {
    await this.rezeptService.update(this.data);
    this.dialogRef.close()
  }

}
