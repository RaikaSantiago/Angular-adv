import { Injectable, NgZone } from '@angular/core';
import { RegisterFormModel } from '../models/register.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../models/login.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario, RegistroModel } from '../models/usuario.model';
import { CargarUsuarioModel } from '../models/cargar-usuarios.model';
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
    localStorage.removeItem('menu');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get rol ():'ADMIN_ROLE'|'USER_ROLE'{
    return this.usuario.role;
  }

  get uid():string {
    return this.usuario.uid || '';
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${ base_url }/login/renew`,this.headers).pipe(
      map( (res:RegistroModel) => {
        const {email, google, nombre, role, img, uid } = res.usuario;
        if (res) {
          this.usuario = new Usuario( nombre, email, '', img, google, role, uid);
        }
        localStorage.setItem('token', res.token);
        localStorage.setItem('menu', JSON.stringify(res.menu));
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario( formData:RegisterFormModel){
    
    return this.http.post(`${ base_url }/usuarios`,formData);
  }

  actualizarPerfil(data: { email: string , nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${ base_url }/usuarios/${this.uid}`,data, this.headers);
  }

  login( formData: LoginFormModel){

    return this.http.post(`${ base_url }/login`,formData);
  }

  loginGoogle(token:string){

    return this.http.post(`${ base_url }/login/google`,{ token });
  }

  cargarUsuarios(desde:number = 0){
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarioModel>(url, this.headers).pipe( 
      map(
      resp => {
        const usuarios = resp.usuarios.map( 
          user => new Usuario(user.nombre, user.email, '',user.img, user.google, user.role, user.uid)
        );
        return {
          total: resp.total,
          usuarios
        };
      }
    ))
  }

  eliminarUsuarios(uid:string){
    const url = `${base_url}/usuarios/${uid}`; 
    return this.http.delete(url, this.headers);
  }

  actualizarUsuario(user: Usuario){
    return this.http.put(`${ base_url }/usuarios/${user.uid}`,user, this.headers);
  }

}
