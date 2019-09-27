import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingItem } from './models/shoppingItem.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {

  public helpArray: ShoppingItem[] = [];

  constructor(private readonly http: HttpClient) { }

  public async decide({ menge, einheit, name }: { menge: number, einheit: string, name: string }) {
    this.helpArray = await this.getAll();
    if (this.helpArray.length === 0) {
      const q = await this.create({
        menge: menge,
        einheit: einheit,
        name: name,
      });
    } else {
      for (let i = 0; i < this.helpArray.length; i++) {
        if (name === this.helpArray[i].name) {
          let helpMenge = +menge + this.helpArray[i].menge;
          await this.update({
            id: this.helpArray[i].id,
            menge: helpMenge,
            einheit: this.helpArray[i].einheit,
            name: this.helpArray[i].name
          })
          name = '';
          einheit = '';
          menge = 0;
          this.helpArray = await this.getAll();
        }
      }
      if (name !== '' && einheit !== '') {
        await this.create({
          menge: menge,
          einheit: einheit,
          name: name,
        });

      }
    }
    return await this.getAll()
  }

  public async getAll() {
    return this.http.get<ShoppingItem[]>('http://localhost:4000/shoppinglist').toPromise();
  }

  public async create({ menge, einheit, name }: { menge: number, einheit: string, name: string }) {
    return this.http.post<ShoppingItem>('http://localhost:4000/shoppinglist', {
      menge,
      einheit,
      name
    }).toPromise()
  }

  public async delete(id: string) {
    return this.http.delete(`http://localhost:4000/shoppinglist/${id}`).toPromise();
  }

  public async update({ menge, einheit, name, id }: { menge: number, einheit: string, name: string, id: string }) {
    return this.http.put(`http://localhost:4000/shoppinglist/${id}`, {
      id,
      menge,
      einheit,
      name
    }).toPromise();
  }
}
