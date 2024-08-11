import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from 'app/models/resource.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private baseUrl = 'http://localhost:9100/library/resource';
  private baseUrlImage = 'http://localhost:9100/library/images';


  constructor(private http: HttpClient) { }

createResource(resource: Resource, imageFiles: File[], userId: number, idSubject: number): Observable<any> {
    const formData = new FormData();
    formData.append('resource', JSON.stringify(resource));
    imageFiles.forEach(file => formData.append('imageFile', file));
    const params = new HttpParams().set('userId', userId.toString());

    return this.http.post(`${this.baseUrl}/add/${idSubject}`, formData, { params });
  }
  retrieveAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/getall`);
  }
  retrieveResource(idResource: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}/getresource/${idResource}`);
  }
  modifyResource(resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.baseUrl}/modify`, resource);
  }

  removeResource(idResource: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${idResource}`);
  }

  getImage(imageId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${imageId}`, { responseType: 'blob' });
  }


}