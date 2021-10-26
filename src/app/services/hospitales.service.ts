import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HospitalModel } from '../models/hospital.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

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

  cargarHospitales(){

    // const url = `${base_url}/hospitales`;
    // return this.http.get<HospitalModel[]>(url, this.headers).pipe( map(
    //   (resp:{ok:boolean, hospitales: }) => resp.hospitales
    // ));
  }
}
