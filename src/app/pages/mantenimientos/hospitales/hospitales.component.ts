import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../../services/hospitales.service';
import { HospitalModel } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  constructor(private hospitalesService: HospitalesService) { }
  public hospital: HospitalModel[] = [];
  loading:boolean = true;
  async ngOnInit(){
     await this.consultaHospitales();
  }

  async consultaHospitales(){
    await this.hospitalesService.cargarHospitales().toPromise().then((hospital:HospitalModel[]) => {
      console.log('res',hospital);
      this.hospital = hospital;
      this.loading = false;
    });
  }
}
