import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { pokemonResolveGuard } from './pokemon-resolve.guard';

describe('pokemonResolveGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      pokemonResolveGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
