import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MedicosModel } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http: HttpClient,) { }

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

  cargarMedico(){
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers).pipe( map(
      (resp:{ok:boolean, medicos:MedicosModel[] }) => resp.medicos
      
    ));
  }

  crearMedicos(nombre:string, hospital:string){
    const url = `${base_url}/medicos`;
    return this.http.post(url, { nombre, hospital }, this.headers);
  }

  actualizarMedicos(_id:string, nombre:string, hospital:string){
    const url = `${base_url}/medicos/${_id}`;
    return this.http.put(url, { nombre, hospital }, this.headers);
  }

  eliminarMedicos(_id:string){
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }

  consultaByIdMedico(id:string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers);
  }
}
