import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + 'film/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class MovieService {

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }
  getMovie(): Observable<any> {
    return this.http.get(API_URL + 'searchFilm', { responseType: 'json'});
  }
  // // deleteMovie(name: string): Observable<any> {
  // //   return this.http.delete(API_URL + 'delete',
  // //   httpOptions
  // // );
  // }
}