import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import IdleTimer from "../../idleTimer.js";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  timer: any;
  constructor(private _usuarioService: UsuarioService){

  }
  
  ngOnInit() {
    this.timer = new IdleTimer({
      timeout: 600, //expired after 10 secs
      onTimeout: () => {
        this._usuarioService.logout();
      }
    });
  }
  ngOnDestroy(): void {
    // this.timer = new IdleTimer();
  }

}
