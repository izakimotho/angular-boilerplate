import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , map } from 'rxjs'; 
import { LOCAL_STORAGE } from '../../../@core/providers/local-storage';
import { environment } from '../../../../environments/environment.prod';
import { LoginRequest } from '../types/login-request.type';
import { LoginResponse } from '../types/login-response.type';
import { RefreshTokenResponseData, RefreshTokenResponse } from '../types/refresh-token.response.type';
import { RegisterRequest } from '../types/register-request.type';
import { RegisterResponseData, RegisterResponse } from '../types/register-response.type';
import { User } from '../types/user.type';

export const ACCESS_TOKEN_KEY = 'access-token';
export const REFRESH_TOKEN_KEY = 'refresh-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly storageService = inject(LOCAL_STORAGE);
  private readonly httpClient = inject(HttpClient); 
  private readonly isUserLoggedInSignal = signal(!!this.storageService?.getItem(ACCESS_TOKEN_KEY));

  private readonly apiUrl = environment.apiBaseUrl;

  register(registerRequest: RegisterRequest): Observable<RegisterResponseData> {
    const registerEndpoint = `${this.apiUrl}/v1/authentication`;
    return this.httpClient
      .post<RegisterResponse>(
        registerEndpoint,
        {
          email: registerRequest.email.trim().toLowerCase(),
          password: registerRequest.password,
          name: registerRequest.name, 
          terms: registerRequest.terms,
        },
        {
          headers: {
            'Accept-Language': 'en',
          },
        },
      )
      .pipe(
        map((response: RegisterResponse) => {
          const { data } = response;
          this.saveTokens(data);
          this.isUserLoggedInSignal.set(true);
          return data;
        }),
      );
  }

  logIn(loginRequest: LoginRequest): Observable<User> {
    const loginEndpoint = `${this.apiUrl}/v1/authentication/login`;
    return this.httpClient
      .post<LoginResponse>(loginEndpoint, {
        email: loginRequest.email.trim().toLowerCase(),
        password: loginRequest.password,
      })
      .pipe(
        map((response: LoginResponse) => {
          const { data } = response;
          this.saveTokens(data);
          this.isUserLoggedInSignal.set(true);
          return data.user;
        }),
      );
  }

  refreshToken(): Observable<RefreshTokenResponseData> {
    const refreshTokenEndpoint = `${this.apiUrl}/v1/authentication/token/refresh`;
    return this.httpClient
      .post<RefreshTokenResponse>(refreshTokenEndpoint, {
        refreshToken: this.storageService?.getItem(REFRESH_TOKEN_KEY),
      })
      .pipe(
        map((response: RefreshTokenResponse) => {
          const { data } = response;
          this.saveTokens(data);
          return data;
        }),
      );
  }

  logOut() {
    this.removeTokens();
    this.isUserLoggedInSignal.set(false);
  }

  isUserLoggedIn(): boolean {
    return this.isUserLoggedInSignal();
  }

  private saveTokens(data: { accessToken: string; refreshToken?: string }) {
    this.storageService?.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    if (data.refreshToken) {
      this.storageService?.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    }
  }

  private removeTokens() {
    this.storageService?.removeItem(ACCESS_TOKEN_KEY);
    this.storageService?.removeItem(REFRESH_TOKEN_KEY);
  }
}
