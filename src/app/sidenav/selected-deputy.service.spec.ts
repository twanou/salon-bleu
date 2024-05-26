import { TestBed } from '@angular/core/testing';

import { SelectedDeputyService } from './selected-deputy.service';

describe('SelectedDeputyService', () => {
  let service: SelectedDeputyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedDeputyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
