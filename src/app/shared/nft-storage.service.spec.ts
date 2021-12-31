import { TestBed } from '@angular/core/testing';

import { NftStorageService } from './nft-storage.service';

describe('NftStorageService', () => {
  let service: NftStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
