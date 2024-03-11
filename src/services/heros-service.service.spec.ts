import { TestBed } from '@angular/core/testing';

import { HerosServiceService } from './heros-service.service';

describe('HerosServiceService', () => {
  let service: HerosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HerosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
