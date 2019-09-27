import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angabe } from './models/angabe.model';
import { Rezept } from './models/rezept.model';

@Injectable({
  providedIn: 'root'
})
export class RezeptService {

  constructor(private readonly http: HttpClient) { }

  public async queryAnlage(query: string) {
    return this.http.get<any>(`http://localhost:4000/angabe`, {
      params: {
        q: query
      }
    }).toPromise()
  }

  public async getAll() {
    return this.http.get<Rezept[]>('http://localhost:4000/rezept').toPromise();
  }

  public async create({ name, description, angaben, anleitung }: { name: string, description: string, angaben: Angabe[], anleitung: string }) {
    return this.http.post<Rezept>('http://localhost:4000/rezept', {
      name,
      description,
      anleitung,
      angaben
    }).toPromise()
  }

  public async delete(id: string) {
    return this.http.delete(`http://localhost:4000/rezept/${id}`).toPromise();
  }

  public async update({ name, description, id }: Rezept) {
    return this.http.put(`http://localhost:4000/rezept/${id}`, {
      name,
      description
    }).toPromise();
  }

  public async getOne(id: string) {
    return this.http.get<Rezept>(`http://localhost:4000/rezept/content/${id}`).toPromise();
  }
}
