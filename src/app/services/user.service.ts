import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user.model';
import { Observable , catchError, map, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9100/library/user';
  constructor(private http: HttpClient) {}
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+"/add", user);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getall`);
  }
  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl+"/get"}/${id}`;
    return this.http.get<User>(url);
  }
  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl+"/update"}`;
    return this.http.put<User>(url, user);
  }
  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl+"/delete"}/${id}`;
    return this.http.delete<void>(url);
  }  
  login(mail:string,password:string):Observable<any>{
    return  this.http.post('http://localhost:9100/library/user/login/'+mail+'/'+password, {},{ responseType: 'text' }).pipe(
      map((response: string) => {
        return response;
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }
  decodeToken(token: any): any {
    if (typeof token !== 'string') {
      console.error('Invalid token:', token);
      return null;
    }
  
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('The token is invalid');
    }
  
    const decoded = JSON.parse(atob(parts[1]));
    return decoded;
  }
  logout() {
    localStorage.removeItem('token');
  }
  getLoggedUser():Observable<User>{
    let id=localStorage.getItem("userId");
    return this.getUserById(Number(id));
  }
}
