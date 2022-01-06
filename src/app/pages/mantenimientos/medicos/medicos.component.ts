import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { MedicosModel } from '../../../models/medico.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public medicos:MedicosModel[] = [];
  cargando:boolean = true;
  constructor(public medicosServices:MedicosService,
              private modalImagenService: ModalImagenService,) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  async cargarMedicos(){
    this.cargando = true;
    await this.medicosServices.cargarMedico().toPromise().then(resp=> {
      this.medicos = resp;
      this.cargando = false;
    })
  }

  async abrirModalMedicos(hospital:MedicosModel){
    this.modalImagenService.abrirModal('hospitales', hospital._id,hospital.img);
  }
}
