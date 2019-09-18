import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { angularMaterial } from '../angular-material';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'checklist',
    loadChildren: () => import('./checklist/checklist.module').then(m => m.ChecklistModule),
  },
  {
    path: 'shoppinglist',
    loadChildren: () => import('./shoppinglist/shoppinglist.module').then(m => m.ShoppinglistModule)
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
    PageNotFoundComponent
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
})
export class AppModule { }
