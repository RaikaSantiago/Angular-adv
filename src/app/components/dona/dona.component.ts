import { Component, Input, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  @Input('title') titulo:string = 'Sin titulo';
  @Input('color') c:Color[] = [{ backgroundColor: ['#6857E6','#009FEE','#F02059']}];
 
   // Doughnut
   @Input('labels')  Labels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
   @Input('data') doughnutChartData: MultiDataSet = [
     [350, 450, 100]
   ];

   constructor() { 
     console.log(this.c);
     
   }
 
   ngOnInit(): void {
   }
 
   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
     console.log(event, active);
   }
 
   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
     console.log(event, active);
   }
 
}
