import { TestBed } from '@angular/core/testing';

import { DetailOpenGuard } from './detail-open.guard';

describe('DetailOpenGuard', () => {
  let guard: DetailOpenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DetailOpenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
