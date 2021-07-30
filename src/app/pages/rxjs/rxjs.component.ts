import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // let i = -1;
    // const obs$ = new Observable( observer => {
      
    //  const intervalo = setInterval( () => {
    //     i++;
    //     observer.next(i);
    //     if ( i === 4) {
    //       clearInterval(intervalo);
    //       observer.complete();
    //     }

    //     if (i === 2) {
    //       observer.error('Llego al valor de 2')
    //     }
       
    //   },1000);
    // });

    // obs$.pipe(
    //   retry(1)
    // ).subscribe(

    //   valor => console.log('Subs:',valor),
    //   () => console.info('Obs Terminado')
      
    // );
  }

}

