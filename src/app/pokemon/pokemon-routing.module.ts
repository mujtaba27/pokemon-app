import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { pokemonResolver } from './gaurds/pokemon-resolve.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'details/:name',
    component: DetailsComponent,
    resolve: { pokemon: pokemonResolver },
  },
  { path: '', redirectTo: '/pokemon/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
