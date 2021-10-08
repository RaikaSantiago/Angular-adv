import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;
  cargando:boolean = false;
  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( file:File ){
    this.cargando = true;
    this.imagenSubir = file;

    if (!file) {
      this.cargando = false;
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      this.cargando = false;
      console.log(reader.result);
    }
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id).then( img => {

      Swal.fire({
        icon: 'success',
        title: 'La imagen se ha actualizado exitosamente',
        showConfirmButton: false,
        timer: 2000
      });
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
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
