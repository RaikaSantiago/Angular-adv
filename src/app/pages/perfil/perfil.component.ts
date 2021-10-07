import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup; 
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) { 
                this.usuario = this.usuarioService.usuario;
              }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre,Validators.required],
      email: [this.usuario.email,[Validators.email, Validators.required]]
    });
  }

  async actualizarPerfil(){

    await this.usuarioService.actualizarPerfil(this.perfilForm.value).toPromise().then((res:any) => {

      const { nombre, email} = res.usuario;
      this.usuario.email = email;
      this.usuario.nombre = nombre;

      Swal.fire({
        icon: 'success',
        title: 'El registro se ha actualizado',
        showConfirmButton: false,
        timer: 2000
      });
    }, err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg,
      })
    });
  }

  cambiarImagen( file:File ){
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid).then( img => {
      this.usuario.img = img
      Swal.fire({
        icon: 'success',
        title: 'La imagen se ha actualizado exitosamente',
        showConfirmButton: false,
        timer: 2000
      });
    }, err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg,
      })
    }
    );
  }

}
