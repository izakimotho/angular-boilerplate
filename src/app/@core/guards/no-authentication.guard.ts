import { inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthenticationService } from '../../features/authentication/services/authentication.service';

export const noAuthenticationGuard = () => {
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.isUserLoggedIn()) {
    const router = inject(Router);
    void router.navigate(['home']);
    return false;
  }
  return true;
};
