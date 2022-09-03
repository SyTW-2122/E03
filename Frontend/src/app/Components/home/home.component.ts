import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MovieService } from 'src/app/services/movies.service';
import { filmsDTO } from 'src/app/models/filmsdto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content?: string;
  moviesArray:filmsDTO[] = [];

  constructor(private userService: UserService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe({
      next: data => {
        this.moviesArray = data;
      },
      error: err => {
        console.log(err);
      }
    });
    this.moviesArray.splice(2);
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}
