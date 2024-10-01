import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public shouldScroll = new BehaviorSubject<boolean>(false);
  private scrollDescision$ = this.shouldScroll.asObservable();

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  scrollPosition = signal<number>(0); // Holds the scroll position

  constructor(private http: HttpClient) {
    this.scrollDescision$.pipe(filter(Boolean)).subscribe(() => {
      this.restorePosition();
    });
  }

  // Fetch paginated Pokemon list with optional search term
  getPokemonList(
    offset: number,
    searchTerm: string | null = ''
  ): Observable<any> {
    if (searchTerm) {
      // Search specific Pokemon by name
      return this.http.get(`${this.apiUrl}/${searchTerm}`).pipe(
        map((pokemon: any) => {
          return {
            count: 1,
            results: [{ name: pokemon.name }],
          };
        }),
        catchError(() => of({ count: 0, results: [] }))
      );
    } else {
      // Fetch paginated list of Pokemon
      return this.http.get(`${this.apiUrl}?limit=10&offset=${offset}`).pipe(
        catchError(() => of({ count: 0, results: [] })) // Handle errors by returning an empty list
      );
    }
  }

  // Fetch details of a specific Pokemon
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`).pipe(
      catchError(() => of(null)) // Handle errors when fetching a Pokemon's details
    );
  }

  // Save the current scroll position in localStorage
  saveScrollPosition(): void {
    this.scrollPosition.set(
      window.scrollY || document.documentElement.scrollTop
    );
    localStorage.setItem('scrollPosition', this.scrollPosition() + '');
  }

  restorePosition() {
    const savedScroll = localStorage.getItem('scrollPosition');
    // Restore scroll position
    if (savedScroll) {
      this.scrollPosition.set(+savedScroll);
      setTimeout(() => {
        window.scrollTo(0, this.scrollPosition());
        localStorage.removeItem('scrollPosition');
      }, 0);
    }
  }
}
