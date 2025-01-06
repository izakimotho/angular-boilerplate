import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { noAuthenticationGuard ,authenticationGuard } from './../../@core/guards';
import { MyAccountComponent } from './pages/my-account/my-account.component';

export const AUTHENTICATION_ROUTES = [
  {
    path: 'logIn',
    component: LogInComponent,
    canActivate: [noAuthenticationGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthenticationGuard],
  },
  {
    path: 'myAccount',
    component: MyAccountComponent,
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: '404' },
];
