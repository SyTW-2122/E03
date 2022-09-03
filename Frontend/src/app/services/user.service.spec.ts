import { HttpClientModule, HttpClient } from '@angular/common/http'; 

import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(UserService);
  });

  it('Se debería de crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
