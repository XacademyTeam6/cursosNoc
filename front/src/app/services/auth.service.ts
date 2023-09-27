import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators'; // Importa tap y shareReplay
import { baseURL } from '../../../src/config';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const userData = { email, password };
    this.isAuthenticated = true;
    return this.http.post(`${baseURL}/api/user/login`, userData)
      .pipe(
        tap(res => this.setSession({ authResult: { authResult: res } })),
        shareReplay()
      );
  }

  private setSession({ authResult }: { authResult:any }): void {  // Cambiado a método privado y añadido tipo void
    const expireAt = moment().add(authResult.expireIn, '1000');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expireAt.valueOf()));
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');  // Cambiado de "expire_at" a "expires_at"
  }
  isLoggedIn(): boolean {
    // Aquí debes implementar la lógica para determinar si el usuario está autenticado
    // Por ejemplo, podrías verificar si existe un token de autenticación en el local storage
    
   
const idToken = localStorage.getItem('id_token');
    return idToken !== null && idToken !== undefined;
  }
}

