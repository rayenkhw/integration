import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'app/models/subject.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = 'http://localhost:9100/library/subject'; // Adjust the port and path as necessary

  constructor(private http: HttpClient) { }


  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.baseUrl}/add`, subject);
  }

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/getall`);
  }

  getSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.baseUrl}/getsubject/${id}`);
  }

  modifySubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.baseUrl}/modif`, subject);
  }

  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/del/${id}`);
  }

}
