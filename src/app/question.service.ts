import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angabe } from './models/angabe.model';
import { Question } from './models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private readonly http: HttpClient) { }

  public async queryAnlage(query: string) {
    return this.http.get<any>(`http://localhost:4000/angabe`, {
      params: {
        q: query
      }
    }).toPromise()
  }

  public async getAll() {
    return this.http.get<Question[]>('http://localhost:4000/question').toPromise();
  }

  public async create({ name, description, angaben, anleitung }: { name: string, description: string, angaben: Angabe[], anleitung: string }) {
    return this.http.post<Question>('http://localhost:4000/question', {
      name,
      description,
      anleitung,
      angaben
    }).toPromise()
  }

  public async delete(id: string) {
    return this.http.delete(`http://localhost:4000/question/${id}`).toPromise();
  }

  public async update({ name, description, id }: Question) {
    return this.http.put(`http://localhost:4000/question/${id}`, {
      name,
      description
    }).toPromise();
  }

  public async getOne(id: string) {
    return this.http.get<Question>(`http://localhost:4000/question/content/${id}`).toPromise();
  }
}
