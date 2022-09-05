import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import { MovieService } from './movies.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(MovieService);
  });

  it('Se debería de crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
