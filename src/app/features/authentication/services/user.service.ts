import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';  
import { environment } from '../../../../environments/environment';
import { GetMeResponse } from '../types/get-me-response.type';
import { UpdateUserRequest } from '../types/update-user-request.type';
import { UpdateUserResponse } from '../types/update-user-response.type';
import { User } from '../types/user.type';
import { CACHING_ENABLED } from '../../../@core/interceptors';
 
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  private readonly apiUrl = environment.apiBaseUrl;

  getMe(options?: { cache: boolean }): Observable<User> {
    const { cache = true } = options ?? {};
    const getMeEndpoint = `${this.apiUrl}/v1/user`;
    return this.httpClient
      .get<GetMeResponse>(getMeEndpoint, {
        context: new HttpContext().set(CACHING_ENABLED, cache),
      })
      .pipe(
        map((response: GetMeResponse) => {
          const { data } = response;
          return data.user;
        }),
      );
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<User> {
    const updateUserEndpoint = `${this.apiUrl}/v1/user`;
    return this.httpClient.patch<UpdateUserResponse>(updateUserEndpoint, updateUserRequest).pipe(
      map((response: UpdateUserResponse) => {
        const { data } = response;
        return data.user;
      }),
    );
  }

 
}
