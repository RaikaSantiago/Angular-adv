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
  arr:number [] = [1,5,10,43,101,202];
  obj:number = 101;
  sizeArr = 6;//sizeof(array)/sizeof(array[0])
  result:any;
  constructor(private _usuarioService: UsuarioService){
    this.result = this.binarySearchRecursive(this.arr, 0, this.sizeArr - 1, this.obj );
    if (this.result == -1) {
      console.log('No se ha encontrado el elemento');
    }else{
      console.log('Elemento encontrado :'+this.result);
    }
  }
  
  ngOnInit() {
    this.timer = new IdleTimer({
      timeout: 1800, //expired after 10 secs
      onTimeout: () => {
        this._usuarioService.logout();
      }
    });
  }
  
  ngOnDestroy(): void {
    // this.timer = new IdleTimer();
  }

  binarySearchRecursive(arr: any, left: number, right: number, obj: number) {
    if (right >= left) {
      let mid = left + (right - left) / 2;
      if (arr[mid] == obj) {
        return mid;
      }
      if (arr[mid] > obj) {
        return this.binarySearchRecursive(arr,left,mid - 1,obj);
      }
    }
    return -1;
  }
}

