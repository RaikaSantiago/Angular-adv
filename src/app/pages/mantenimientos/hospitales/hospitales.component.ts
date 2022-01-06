import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalesService } from '../../../services/hospitales.service';
import { HospitalModel } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  
  
  public hospital: HospitalModel[] = [];
  loading:boolean = true;
  public imagenSubs:Subscription;
  
  constructor(private hospitalesService: HospitalesService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  async ngOnInit(){
     await this.consultaHospitales();
     this.imagenSubs = this.modalImagenService.nuevaImagen.pipe( delay(200)).subscribe( img => this.consultaHospitales());
  }

  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  async consultaHospitales(){
    await this.hospitalesService.cargarHospitales().toPromise().then((hospital:HospitalModel[]) => {
      this.hospital = hospital;
      this.loading = false;
    });
  }

  guardarCambios(hospital:HospitalModel){
    Swal.fire({
      title: '¿Esta seguro de actualizar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1DB93E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Actualizar!',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await this.hospitalesService.actualizarHospital(hospital._id, hospital.nombre).toPromise().then((resp:any) => {
          Swal.fire(
            'Actualizado', 
            resp.hospital.nombre, 
            'success'
          )
        })
      }
    })
  }

  eliminarRegistros(hospital:HospitalModel){
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
        await this.hospitalesService.eliminarHospital(hospital._id).toPromise().then((resp1:any) => {
          Swal.fire(
            'Eliminado', 
            resp1.msg, 
            'success'
          )

          if (resp1.ok) {
            this.hospital = this.hospital.filter(resp => resp._id !== hospital._id);
          }
        })
      }
    }) 
  }

  async abrirModal(){
    const valor = await Swal.fire({
      title:'Crear Hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
      confirmButtonText: 'Crear Hospital',
      cancelButtonText:'Cancelar'
    })

    if (valor.isConfirmed) {
      if (valor.value.trim().length > 0) {
        this.crearRegistro(valor.value);
      }else{
        Swal.fire(
          'Ingresar Nombre', 
          'warning'
        )
      }
    }
    
  }

  async crearRegistro(nombre:string){
    await this.hospitalesService.crearHospital(nombre).toPromise().then(async (resp:any) => {
      Swal.fire(
        'Creado', 
        resp.hospital.nombre, 
        'success'
      )
        
      if (resp.ok) {
        await this.consultaHospitales();
      }
    })
  }

  async abrirModalHospitales(hospital:HospitalModel){
    this.modalImagenService.abrirModal('hospitales', hospital._id,hospital.img);
  }

  buscar(termino:string){

    if (termino.length === 0) {
      return this.consultaHospitales();
    }

    this.busquedasService.busqueda('hospitales',termino).toPromise().then((resp:HospitalModel[]) => {
      this.hospital = resp;
    })
  }
}
