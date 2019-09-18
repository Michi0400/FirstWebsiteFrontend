import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { angularMaterial } from '../../angular-material';
import { ShoppingItemService } from '../shoppingitem.service';
import { ShoppingitemDeleteComponent } from "./shoppingitem-delete/shoppingitem-delete.component";
import { ShoppinglistComponent } from './shoppinglist.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppinglistComponent
  }
]

@NgModule({
  declarations: [
    ShoppinglistComponent,
    ShoppingitemDeleteComponent
  ],
  imports: [
    CommonModule,
    angularMaterial,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ShoppingItemService],
  entryComponents: [ShoppingitemDeleteComponent]
})
export class ShoppinglistModule { }





