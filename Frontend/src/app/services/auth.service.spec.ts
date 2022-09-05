import { HttpClientModule, HttpClient } from '@angular/common/http'; 

import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(AuthService);
  });

  it('Se debería de crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
