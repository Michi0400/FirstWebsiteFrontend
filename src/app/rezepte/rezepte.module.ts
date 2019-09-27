import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { angularMaterial } from '../../angular-material';
import { RezeptService } from '../rezept.service';
import { ShoppingItemService } from '../shoppingitem.service';
import { RezeptAddComponent } from './rezept-add/rezept-add.component';
import { RezeptContentComponent } from './rezept-content/rezept-content.component';
import { RezeptDeleteComponent } from "./rezept-delete/rezept-delete.component";
import { RezeptEditComponent } from './rezept-edit/rezept-edit.component';
import { RezeptComponent } from './rezepte.component';


const routes: Routes = [
  {
    path: '',
    component: RezeptComponent
  },
  {
    path: 'content/:id',
    component: RezeptContentComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    RezeptComponent,
    RezeptEditComponent,
    RezeptDeleteComponent,
    RezeptContentComponent,
    RezeptAddComponent
  ],
  imports: [
    CommonModule,
    angularMaterial,
    FormsModule,
    RouterModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [RezeptService, ShoppingItemService],
  entryComponents: [RezeptEditComponent, RezeptDeleteComponent, RezeptAddComponent]
})
export class RezeptModule { }
