import { TestBed } from '@angular/core/testing';

import { NearConnectionService } from './near-connection.service';

describe('NearConnectionService', () => {
  let service: NearConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NearConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
