import { TestBed, inject } from '@angular/core/testing';

import { RestApiRequestService } from './rest-api-request.service';

describe('RestApiRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestApiRequestService]
    });
  });

  it('should be created', inject([RestApiRequestService], (service: RestApiRequestService) => {
    expect(service).toBeTruthy();
  }));
});
