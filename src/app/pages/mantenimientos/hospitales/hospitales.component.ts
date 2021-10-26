import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../../services/hospitales.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  constructor(private hospitalesService: HospitalesService) { }

  // async ngOnInit(){
  //    await this.consultaHospitales();
  // }

  // async consultaHospitales(){
  //   await this.hospitalesService.cargarHospitales().toPromise().then(res => {
  //     console.log('res',res);
      
  //   });
  // }
}
