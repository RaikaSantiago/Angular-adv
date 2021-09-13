import { Injectable, NgZone } from '@angular/core';
import { RegisterFormModel } from '../models/register.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../models/login.model';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
declare var gapi:any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  auth2:any;
  usuario:Usuario;
  constructor(private http: HttpClient,
              private router: Router,
              private ngZone:NgZone) {
    this.googleInit();
  }

  googleInit(){

    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '557293408583-huol63oiu3vsq1hh768jtoqh7bde7pgn.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });
    });
    
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

   return this.http.get(`${ base_url }/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res:any) => {
        const {email, google, nombre, role, img, uid } = res.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid)
        localStorage.setItem('token', res.token);
      }),map( resp => true),
      catchError(error => of(false))
    );
  }

  crearUsuario( formData:RegisterFormModel){
    
    return this.http.post(`${ base_url }/usuarios`,formData);
  }

  login( formData: LoginFormModel){

    return this.http.post(`${ base_url }/login`,formData);
  }

  loginGoogle(token:string){

    return this.http.post(`${ base_url }/login/google`,{ token });
  }
}
