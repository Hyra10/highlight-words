import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
  }));

  it('should be created', () => {
    const service: RepositoryService = TestBed.get(RepositoryService);
    expect(service).toBeTruthy();
  });
});
