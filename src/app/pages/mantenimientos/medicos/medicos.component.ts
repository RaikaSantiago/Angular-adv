import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { MedicosModel } from '../../../models/medico.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos:MedicosModel[] = [];
  cargando:boolean = true;
  public imagenSubs:Subscription;
  
  constructor(public medicosServices:MedicosService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  ngOnInit(){
    this.cargarMedicos();
    this.imagenSubs = this.modalImagenService.nuevaImagen.pipe( delay(200)).subscribe( img => this.cargarMedicos());
  }

  async cargarMedicos(){
    this.cargando = true;
    await this.medicosServices.cargarMedico().toPromise().then(resp=> {
      this.medicos = resp;
      this.cargando = false;
    })
  }

  async abrirModalMedicos(medicos:MedicosModel){
    this.modalImagenService.abrirModal('medicos', medicos._id,medicos.img);
  }

  buscar(termino:string){

    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedasService.busqueda('medicos',termino).toPromise().then(resp => {
      this.medicos = resp;
    })
  }

  borrarMedico(id:string){
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await this.medicosServices.eliminarMedicos(id).toPromise().then((resp1:any) => {
          Swal.fire(
            'Eliminado', 
            resp1.msg, 
            'success'
          )

          if (resp1.ok) {
            this.medicos = this.medicos.filter(resp => resp._id !== id);
          }
        })
      }
    }) 
  }
}
