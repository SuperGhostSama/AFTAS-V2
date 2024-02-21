import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterRequestDTO } from 'src/app/dto/requests/register-request.dto';
import { AuthenticationResponseDTO } from 'src/app/dto/responses/auth-response.dto';
import { AuthenticationRequestDTO } from 'src/app/dto/requests/auth-request.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.api}auth`;

  constructor(private http: HttpClient) {}

  register(request: RegisterRequestDTO): Observable<AuthenticationResponseDTO> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post<AuthenticationResponseDTO>(registerUrl, request);
  }

  authenticate(request: AuthenticationRequestDTO): Observable<AuthenticationResponseDTO> {
    const authenticateUrl = `${this.apiUrl}/authenticate`;
    return this.http.post<AuthenticationResponseDTO>(authenticateUrl, request);
  }
}
