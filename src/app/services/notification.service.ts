import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from 'app/models/notification.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:9100/library/notifications';
  constructor(private http: HttpClient) { }

  retrieveAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }

  retrieveNotification(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${id}`);
  }

  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.baseUrl, notification);
  }

  modifyNotification(id: number, notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.baseUrl}/${id}`, notification);
  }

  removeNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
