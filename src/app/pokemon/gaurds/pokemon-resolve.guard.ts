import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Observable } from 'rxjs';

export const pokemonResolver: ResolveFn<Observable<any>> = (route) => {
  const pokemonService = inject(PokemonService); // inject the service
  const pokemonName = route.paramMap.get('name')!; // retrieve the 'name' parameter from the route
  return pokemonService.getPokemonDetails(pokemonName); // return an observable with the details
};
