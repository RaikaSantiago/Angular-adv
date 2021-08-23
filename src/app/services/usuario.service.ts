import { Injectable } from '@angular/core';
import { RegisterFormModel } from '../models/register.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../models/login.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario( formData:RegisterFormModel){
    
    return this.http.post(`${ base_url }/usuarios`,formData);
  }


  login( formData: LoginFormModel){

    return this.http.post(`${ base_url }/login`,formData);
  }
}
