import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingItem } from './models/shoppingItem.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {

  constructor(private readonly http: HttpClient) { }

  public async getAll() {
    return this.http.get<ShoppingItem[]>('http://localhost:4000/shoppinglist').toPromise();
  }

  public async create({ name }: { name: string }) {
    return this.http.post<ShoppingItem>('http://localhost:4000/shoppinglist', {
      name
    }).toPromise()
  }

  public async delete(id: string) {
    return this.http.delete(`http://localhost:4000/shoppinglist/${id}`).toPromise();
  }

  public async update({ name, id }: ShoppingItem) {
    return this.http.put(`http://localhost:4000/shoppinglist/${id}`, {
      name
    }).toPromise();
  }
}
