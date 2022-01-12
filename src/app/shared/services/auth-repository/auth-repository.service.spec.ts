import { TestBed } from '@angular/core/testing';

import { AuthRepositoryService } from './auth-repository.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
  }));

  it('should be created', () => {
    const service: AuthRepositoryService = TestBed.get(AuthRepositoryService);
    expect(service).toBeTruthy();
  });
});
