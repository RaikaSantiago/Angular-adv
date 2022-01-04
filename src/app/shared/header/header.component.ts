import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private usuarioService: UsuarioService,
              private router: Router) { 
                
              }

  ngOnInit(): void {
    this.user = this.usuarioService.usuario;
  }
  
  logout(){
    this.usuarioService.logout();
  }

  buscar(termino:string){

    if (termino.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }
}
