import { TestBed } from '@angular/core/testing';

import { VerificationInterceptor } from './verification.interceptor';

describe('VerificationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      VerificationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: VerificationInterceptor = TestBed.inject(VerificationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
