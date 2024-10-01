import { Component, computed, OnDestroy, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { UserStateManagementService } from '../../services/user-state-management.service';
import { FavoritesDirective } from '../../directives/favorites.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatPaginatorModule,
    CommonModule,
    MatListModule,
    MatFormField,
    MatLabel,
    NgFor,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FavoritesDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnDestroy {
  nameCtrl = new FormControl<string>('');

  pokemonList = signal<any[]>([]);
  fvrtList = signal<{ name: string }[]>([]);

  toggleList = signal<boolean>(false);

  totalPokemon = signal<number>(0);

  pageSize = signal(10);

  offset = computed(() => this.currentPage() * this.pageSize()); // Calculate offset based on page number and limit (10)
  // Signals to track user input and pagination
  searchTerm = signal<string>(''); // Holds the current search input
  currentPage = signal<number>(0); // Holds the current page for pagination

  // Signals to track error and notify user
  hasError = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(
    private pokemonService: PokemonService,
    private userManagement: UserStateManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restoreState();
    this.nameCtrl.valueChanges.pipe(debounceTime(1000)).subscribe((x) => {
      if (x) {
        this.searchTerm.set(x.toLowerCase());
      }
      this.searchTerm.set('');
      this.getPokemonPage();
    });
  }

  // Fetch paginated Pokemon list
  getPokemonPage(): void {
    this.pokemonService
      .getPokemonList(this.offset(), this.searchTerm())
      .subscribe((data) => {
        // Set total count for pagination
        if (!data?.count) {
          this.pokemonList.set([]);
          this.totalPokemon.set(0);
          this.hasError.set(true);
          this.errorMessage.set('No Pokemon found!');
          this.clearSearch(); // Clear search if no Pokemon is found
        } else {
          this.pokemonList.set(data?.results);
          this.totalPokemon.set(data.count);
          this.hasError.set(false); // Reset error state
          this.pokemonService.shouldScroll.next(true);
        }
      });
  }

  // Handle page change
  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(10);
    this.getPokemonPage(); // Fetch next page data
  }
  viewDetails(pokemon: any) {
    // Navigate to the detail page
    this.router.navigate(['/pokemon/details', pokemon.name], {
      relativeTo: this.route,
    });
  }

  // Save the current scroll position in localStorage
  saveScrollPosition(): void {
    this.pokemonService.saveScrollPosition();
  }

  // Restore search, page, and scroll position from localStorage
  restoreState(): void {
    const savedSearch = localStorage.getItem('searchQuery');
    const savedPage = localStorage.getItem('currentPage');

    if (savedSearch) {
      this.searchTerm.set(savedSearch);
      this.nameCtrl.setValue(savedSearch);
    }
    if (savedPage) {
      this.currentPage.set(+savedPage);
      this.pageSize.set(10);
    }

    this.getPokemonPage(); // Ensure data is fetched again
  }

  // Clear the search field if no Pokemon is found
  clearSearch(): void {
    this.searchTerm.set('');
    setTimeout(() => {
      this.errorMessage.set('Fetching All Records....');
      this.nameCtrl.reset();
    }, 1000);
  }

  ngOnDestroy(): void {
    localStorage.setItem('searchQuery', this.searchTerm());
    localStorage.setItem('currentPage', this.currentPage() + '');
    this.saveScrollPosition(); // Save the current scroll position when navigating away
  }

  toggleFavorite(pokemon: pokemon) {
    this.userManagement.toggleFavorite(pokemon.name.toLowerCase());
    this.fvrtList.set(this.userManagement.getFvrtList());
  }

  showFvrtList() {
    if (this.toggleList()) {
      this.toggleList.set(false);
      this.fvrtList.set([]);
    } else {
      this.toggleList.set(true);
    }
  }
}

export interface pokemon {
  name: string;
  url: string;
}
