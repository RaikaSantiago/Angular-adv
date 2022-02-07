import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalesService } from '../../../../services/hospitales.service';
import { HospitalModel } from '../../../../models/hospital.model';
import { MedicosService } from '../../../../services/medicos.service';
import { MedicosModel } from '../../../../models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm:FormGroup;
  hospitales: HospitalModel[] = [];
  hospitalSelect: HospitalModel;
  public medicoSelect:any;
  id:string;

  constructor(private fb:FormBuilder,
              private hospitalService: HospitalesService,
              private medicosService: MedicosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 

              }

  ngOnInit(): void {
    this.form();
    this.activatedRoute.params.subscribe( ({id}) => {
      this.id = id;
      if (id !== 'nuevo') {
        this.consultaByIdMedico(id);
      }
    })
    
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
      nombre:['', Validators.required],
      hospital:['', Validators.required]
    })
  }

  cambioHospital(){
    this.medicoForm.get('hospital').valueChanges.subscribe( hospitalId => {
      this.hospitalSelect = this.hospitales.find( hospital => hospital._id === hospitalId);
    })
  }

  ngSubmit(){

    if (this.id === 'nuevo') { 
      this.medicosService.crearMedicos(this.medicoForm.value.nombre, this.medicoForm.value.hospital).subscribe((resp:any) => {
        Swal.fire(
          'Creado', 
          resp.medicos.nombre, 
          'success'
        )
        this.router.navigateByUrl(`/dashboard/medico/${resp.medicos._id}`)
      })
    }else{
      this.medicosService.actualizarMedicos(this.id, this.medicoForm.value.nombre,this.medicoForm.value.hospital).subscribe((res:any )=> {
        Swal.fire(
          'Actualizado', 
          res.medicos.nombre, 
          'success'
        )
        this.router.navigateByUrl(`/dashboard/medico/${res.medicos._id}`)
      })
    }
  }

  consultaByIdMedico(id:string){
    this.medicosService.consultaByIdMedico(id).subscribe((res:any) => {
      this.medicoSelect = res.medico;
      this.medicoForm.patchValue({
        nombre: this.medicoSelect.nombre,
        hospital: this.medicoSelect.hospital._id
      })
    })
  }

}
