import { Routes } from '@angular/router';
import { authGuard, infoResolver } from './auth/gaurds/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pokemon',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pokemon/pokemon.module').then((m) => m.PokemonModule),
  },
  {
    path: 'info',
    resolve: [infoResolver],
    loadChildren: () => import('./info/info.module').then((m) => m.InfoModule),
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' }, // Handle unknown paths
];
