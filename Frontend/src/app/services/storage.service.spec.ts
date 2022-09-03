import { HttpClientModule, HttpClient } from '@angular/common/http'; 

import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(StorageService);
  });

  it('Se debería de crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
