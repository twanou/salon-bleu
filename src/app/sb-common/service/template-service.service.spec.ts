import { TestBed } from '@angular/core/testing';

import { TemplateService } from './template-service.service';

describe('TemplateServiceService', () => {
  let service: TemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
