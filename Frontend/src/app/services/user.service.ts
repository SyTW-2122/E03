import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/user.model';
import {catchError, map} from 'rxjs/operators';

const API_URL = 'http://localhost:4200/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) {}

  public getPublicContent(): Observable<any> {
    return this.httpService.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.httpService.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.httpService.get(API_URL + 'admin', { responseType: 'text' });
  }
}

