import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input('valor') progress:number;
  @Input() btnClass:string = 'btn btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cambiarValor(valor:number){

    if (this.progress >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progress = 100;
    }

    if (this.progress <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progress = 0;
    }
    
      this.progress += valor;
      this.valorSalida.emit(this.progress);
  }

  onChange(valor:number){

    if (valor>= 100) {
        this.progress = 100;
    } else if (valor <= 0) {
        this.progress = 0;
    }else{
      this.progress = valor;
    }
    this.valorSalida.emit(this.progress);
  }

  
}
