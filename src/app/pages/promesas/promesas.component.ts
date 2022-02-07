import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( users => {
      
      
    });

    
  }

  getUsuarios(){

    return new Promise( (resolve) => {
      fetch('https://reqres.in/api/users').then( res => res.json()).then(body => resolve(body.data));
    });
   
  }

}
