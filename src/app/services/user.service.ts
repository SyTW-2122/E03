import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/user.model';
import {catchError, map} from 'rxjs/operators';

const API_URL = 'http://localhost:4200/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) {}

  public getUser(id: number): Observable<User> {
    return this.httpService.get<User>(`http://localhost:3000/user/${id}`).pipe(
      map(data => new User().deserialize(data)),
      catchError(() => throwError('User not found'))
    );
  }

  public getPublicContent(): Observable<any> {
    return this.httpService.get(API_URL + 'all', { responseType: 'text' });
  }
}

