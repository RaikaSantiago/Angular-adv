import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.model';
import { HospitalModel } from '../models/hospital.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private trasnsformarUsers( resultados:any[]):Usuario[]{
    return resultados.map( user => new Usuario(user.nombre, user.email, '',user.img, user.google, user.role, user.uid))
  }

  private trasnsformarHospitales( resultados:any[]):HospitalModel[]{
    return resultados;
  }

  busquedaGlobal(termino:string){
    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url, this.headers);
  }

  busqueda( tipo:'usuarios'| 'medicos'| 'hospitales', termino:string = ''){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get(url, this.headers).pipe(
      map( (resp:any) => {

        switch (tipo) {
          case 'usuarios':
            return this.trasnsformarUsers(resp.resultados);
          case 'hospitales':
            return this.trasnsformarHospitales(resp.resultados);
          case 'medicos':
            
            break;
          default:
            return[];
        }
      })
    );
  }
}
