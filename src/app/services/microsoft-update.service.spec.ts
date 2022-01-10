import { TestBed } from '@angular/core/testing';

import { MicrosoftUpdateService } from './microsoft-update.service';

describe('MicrosoftUpdateService', () => {
  let service: MicrosoftUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrosoftUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
