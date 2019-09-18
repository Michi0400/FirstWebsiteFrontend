import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChecklistComponent } from './checklist/checklist.component';

const routes: Routes = [
    {
      path: 'checklist',
          component: ChecklistComponent
      },
    {      
        path: '',
        redirectTo: 'checklist',
        pathMatch: 'full'
    },
      {
      path: 'shoppinglist', 
          component: ShoppinglistComponent
      },
      {
          path: '**',
          component: PageNotFoundComponent
      }
  ];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
