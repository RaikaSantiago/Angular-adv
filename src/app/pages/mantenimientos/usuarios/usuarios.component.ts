import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  totalUsuarios:number = 0;
  usuarios:Usuario[] = [];
  usuariosTemp:Usuario[] = [];
  desde:number = 0;
  cargando:boolean = true;
  uid:string;
  public imagenSubs:Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) { 
                this.uid = this.usuarioService.uid;
              }
  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  async ngOnInit() {

    await this.consultarUsuarios();
    this.imagenSubs = this.modalImagenService.nuevaImagen.pipe( delay(100)).subscribe(img => this.consultarUsuarios());
  }

  async consultarUsuarios(){
    this.cargando = true;
    await this.usuarioService.cargarUsuarios(this.desde).toPromise().then( ({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
  }

  cambiarPag( valor:number){
    this.desde += valor; 

    if(this.desde < 0){
      this.desde = 0;
    } else if ( this.desde > this.totalUsuarios){
      this.desde -= valor; 
    }

    this.consultarUsuarios();
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.actualizarUsuario(usuario).toPromise().then(resp => {
      console.log(resp);
    });
  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
  }

  async buscar(termino:string){
    this.cargando = true;
    if(termino.length === 0){
      this.cargando = false;
      return this.usuarios = this.usuariosTemp;
    }

    await this.busquedaService.busqueda('usuarios',termino).toPromise().then((resultados:Usuario[]) => {

      if (resultados.length > 0) {
        this.usuarios = resultados;
        this.cargando = false;
      }else{
        alert('La referencia no a sido encontrada');
      }
    });
  }

  eliminarUsuario(usuario:Usuario){

    if (usuario.uid === this.usuarioService.uid) {
      return;
    }
    
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta apunto de borrar al Usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuarios(usuario.uid).toPromise().then((resp:any) => {
          if (resp.ok === true) {
            this.usuarios = this.usuarios.filter(termino => termino.uid  !== usuario.uid)
            Swal.fire(
              'Eliminado!',
              `El usuario ${usuario.nombre} se ha eliminado con exito.`,
              'success'
            )
          }
        });
        
      }
    })
  }

}
