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

  constructor(private router:Router,
              private usuarioService: UsuarioService) { 
                this.emailPerfil = localStorage.getItem('email');
                this.nombrePerfil = localStorage.getItem('nombre');
              }

  ngOnInit(): void {
  }
  
  logout(){
    this.usuarioService.logout();
  }
}
