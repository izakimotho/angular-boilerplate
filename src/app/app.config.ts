import { ApplicationConfig, enableProdMode, inject,  provideZoneChangeDetection } from '@angular/core';
import { createUrlTreeFromSnapshot, PreloadAllModules, provideRouter, Router, RouteReuseStrategy, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withPreloading, withRouterConfig, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi,  withFetch, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.prod'; 
import { RouteReusableStrategy } from './@core/helpers';
import { AuthenticationInterceptor } from './@core/interceptors/authentication.interceptor';
import { CachingInterceptor } from './@core/interceptors/caching.interceptor';
import { loggingInterceptor } from './@core/interceptors/logging.interceptor';

if (environment.production) {
  enableProdMode();
}


export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection is required for Angular's zone.js
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling(),
      withViewTransitions({
        onViewTransitionCreated: ({ transition, to }) => {
          const router = inject(Router);
          const toTree = createUrlTreeFromSnapshot(to, []);
          // Skip the transition if the only thing changing is the fragment and queryParams
          if (
            router.isActive(toTree, {
              paths: 'exact',
              matrixParams: 'exact',
              fragment: 'ignored',
              queryParams: 'ignored',
            })
          ) {
            transition.skipTransition();
          }
        },
      }),
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always', onSameUrlNavigation: 'reload' }),      
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthenticationInterceptor, CachingInterceptor,loggingInterceptor]),
    ),
    // provideHttpClient is required for Angular's HttpClient with additional configuration, which includes interceptors from DI (dependency injection) , means to use class based interceptors
    provideHttpClient(withFetch(),withInterceptorsFromDi()),
    
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    
     
  ],
};


 