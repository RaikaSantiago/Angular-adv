import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  emailPerfil:string;
  nombrePerfil:string;

  constructor(private usuarioService: UsuarioService) { 
                this.emailPerfil = localStorage.getItem('email');
                this.nombrePerfil = localStorage.getItem('nombre');
              }

  ngOnInit(): void {
    if (this.emailPerfil === null) {
      this.emailPerfil = 'ejemplo@gmail.com';
    }
    if (this.nombrePerfil === null) {
      this.nombrePerfil = 'Perfil prueba';
    }
  }
  
  logout(){
    this.usuarioService.logout();
  }
}
