import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { angularMaterial } from '../../angular-material';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        angularMaterial,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    entryComponents: []
})
export class HomeModule { }