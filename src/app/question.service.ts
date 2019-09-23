import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private readonly http: HttpClient) { }

  public async getAll() {
    return this.http.get<Question[]>('http://localhost:4000/question').toPromise();
  }

  public async create({ input, output, angaben, anleitung }: { input: string, output: string, angaben: string[], anleitung: string }) {
    return this.http.post<Question>('http://localhost:4000/question', {
      input,
      output,
      angaben,
      anleitung
    }).toPromise()
  }

  public async delete(id: string) {
    return this.http.delete(`http://localhost:4000/question/${id}`).toPromise();
  }

  public async update({ input, output, id }: Question) {
    return this.http.put(`http://localhost:4000/question/${id}`, {
      input,
      output
    }).toPromise();
  }

  public async getOne(id: string) {
    return this.http.get<Question>(`http://localhost:4000/question/content/${id}`).toPromise();
  }
}
