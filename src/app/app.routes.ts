import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { Error404Component } from './shared/components/error-404/error-404.component';

export const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
    },
    // {
    //   path: 'dashboard',
    //   component: DashboardComponent,
    //   canActivate: [authenticationGuard],
    // },
    {
      path: 'auth',
      loadChildren: async () =>
        import('./features/authentication/authentication.routes').then(
          (module_) => module_.AUTHENTICATION_ROUTES,
        ),
    },
    // {
    //   path: POKEMON_PATHS.base,
    //   loadChildren: async () =>
    //     import('./features/pokemon/pokemon.routes').then((module_) => module_.POKEMON_ROUTES),
    // },
    { path: '404', component: Error404Component },
    { path: '**', redirectTo: '404' },
  ];
  