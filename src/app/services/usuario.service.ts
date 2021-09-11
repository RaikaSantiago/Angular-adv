import { Injectable } from '@angular/core';
import { RegisterFormModel } from '../models/register.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../models/login.model';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

   return this.http.get(`${ base_url }/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res:any) => {
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
