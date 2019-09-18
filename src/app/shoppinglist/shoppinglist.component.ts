import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent{
  public isAdd = false;
  public newInput = '';
  public trainingData: Array<string>= ['Gegenstand 1', 'Gegenstand 2'];
  public isEmpty = false;

  constructor(private router: Router){};

  public add(){
    this.isAdd = !this.isAdd;
    if (!this.isAdd && this.newInput!='') {
      this.trainingData.push(this.newInput);
      this.newInput = '';
    }
    this.isEmpty=false;
  }
  public delete(data){
    this.trainingData.splice(data,1);
    if(this.trainingData.length==0){
      this.isEmpty = true;
    }
  }

  public goToChecklist(){
    this.router.navigateByUrl('/checklist');
  }

  public goToShoppinglist(){
    this.router.navigateByUrl('/shoppinglist');
  }

  public deleteAll(){
    this.trainingData.forEach(element => {
      this.trainingData.splice(this.trainingData.indexOf(element), this.trainingData.length)
    });
    this.isEmpty = true;
  }
  
}

