import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalesService } from '../../../../services/hospitales.service';
import { HospitalModel } from '../../../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm:FormGroup;
  hospitales: HospitalModel[] = [];
  hospitalSelect: HospitalModel;
  constructor(private fb:FormBuilder,
              private hospitalService: HospitalesService) { }

  ngOnInit(): void {
    this.form();
    this.consultarHospitales();
    this.cambioHospital();
  }

  

  consultarHospitales(){
    this.hospitalService.cargarHospitales().subscribe( (hospitales:HospitalModel[]) => {
      this.hospitales = hospitales;
    })
  }

  form(){
    this.medicoForm = this.fb.group({
      nombre:['Prueba', Validators.required],
      hospital:['', Validators.required]
    })
  }

  cambioHospital(){
    this.medicoForm.get('hospital').valueChanges.subscribe( hospitalId => {
      this.hospitalSelect = this.hospitales.find( hospital => hospital._id === hospitalId);
    })
  }

  ngSubmit(){

  }

}
