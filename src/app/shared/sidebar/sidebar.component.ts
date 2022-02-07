import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  user:Usuario;
  constructor(public sidebarService:SidebarService,
              private usuarioService: UsuarioService,
              private router:Router) { 
    
  }

  ngOnInit(): void {
    this.user = this.usuarioService.usuario;
  }
  logout(){
    this.router.navigateByUrl('login');
  }
}
