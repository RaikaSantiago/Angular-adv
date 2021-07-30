import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  titulo:string;
  public tituloSubs:Subscription;
  constructor(private router: Router) { 
   this.tituloSubs = this.tituloSub().subscribe( ({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`
    });;
   
  }
  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
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
