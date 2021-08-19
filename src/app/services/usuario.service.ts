import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  crearUsuario( formData:any){
    console.log('creando usuario');
    
  }
}
