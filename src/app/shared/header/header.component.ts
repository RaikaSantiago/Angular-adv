import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  user:Usuario;
  constructor(private usuarioService: UsuarioService) { 
                
              }

  ngOnInit(): void {
    this.user = this.usuarioService.usuario;
  }
  
  logout(){
    this.usuarioService.logout();
  }
}
