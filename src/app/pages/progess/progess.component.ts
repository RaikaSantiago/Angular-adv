import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progess',
  templateUrl: './progess.component.html',
  styleUrls: ['./progess.component.css']
})
export class ProgessComponent implements OnInit {

  progreso1:number = 60;
  progreso2:number = 30;
  btnClass2:string = 'btn btn-info';

  constructor(){

  }

  ngOnInit(){

  }

  get porcentaje1(){
    return `${this.progreso1}%`;
  }

  get porcentaje2(){
    return `${this.progreso2}%`;
  }

  
}
