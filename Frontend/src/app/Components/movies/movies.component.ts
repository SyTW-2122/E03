import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { filmsDTO } from 'src/app/models/filmsdto';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  moviesArray:filmsDTO[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe({
      next: data => {
        console.log("Esto es lo que me devuelven las peliculas:", data);
        this.moviesArray = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}