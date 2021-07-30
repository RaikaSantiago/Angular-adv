import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {
  titulo:string;
  public tituloSubs:string;
  constructor(private router: Router) { 
    this.tituloSub();
   
  }

  ngOnInit(): void {
  }

  tituloSub(){
   return this.router.events.pipe(
      filter( events => events instanceof ActivationEnd),
      filter( (event: ActivationEnd ) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd ) => event.snapshot.data)

    );
  }

}
