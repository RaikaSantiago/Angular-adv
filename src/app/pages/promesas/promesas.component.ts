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
      console.log(users);
      
    });
    // const promesa = new Promise( (resolve,reject) => {

    //   if (false) {
    //     resolve('Hola Mundo!');
    //   }else{
    //     reject('Algo Salio Mal')
    //   }
     
      
    // });

    // promesa.then( (mensaje) => {
    //   console.log('Termine',mensaje);
      
    // }).catch( err => {
    //   console.log(err);
      
    // });

    // console.log('Fin del Init');
    
  }

  getUsuarios(){

    return new Promise( (resolve) => {
      fetch('https://reqres.in/api/users').then( res => res.json()).then(body => resolve(body.data));
    });
   
  }

}
