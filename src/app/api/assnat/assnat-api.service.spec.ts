import { TestBed } from '@angular/core/testing';

import { AssnatApiService } from './assnat-api.service';

describe('AssnatApiService', () => {
  let service: AssnatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssnatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
