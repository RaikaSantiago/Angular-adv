import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  title1:string = 'Ventas';
  title2:string = 'Mercado';
  color1:any = [{ backgroundColor: ['#EADC30','#FE1F04','#F2F906']}];
  labels1:Label[] = ['Label 1', 'Label 2', 'Label 3'];
  data1: MultiDataSet = [
    [1000, 3000, 4500]
  ];
  constructor() { }

  ngOnInit(): void {
  }


}
