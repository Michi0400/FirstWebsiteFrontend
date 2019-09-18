import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { angularMaterial } from '../angular-material';
import { AppComponent } from './app.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';

const appRoutes: Routes = [
  {
    path: 'checklist',
    component: ChecklistComponent
  },
  {
    path: 'shoppinglist',
    component: ShoppinglistComponent
  },
  {
    path: '',
    redirectTo: '/checklist',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    PageNotFoundComponent,
    ChecklistComponent,
    QuestionEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    angularMaterial,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QuestionEditComponent]
})
export class AppModule { }
