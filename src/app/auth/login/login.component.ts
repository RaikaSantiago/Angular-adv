import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormModel } from 'src/app/models/login.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.Component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email]),
    password: new FormControl ('', Validators.required),
    remember: new FormControl (localStorage.getItem('remember') || false )
  });
  
  constructor(private router:Router,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  login(){
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    

    this.usuarioService.login(this.loginForm.value).toPromise().then( (res:any) =>{

      if ( res !== null) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('uid', res.uid);
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem('remember', this.loginForm.get('remember').value );
        }else{
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }
        this.router.navigateByUrl('/');
      }
   
    },err => {
       /*Mensaje error */
       Swal.fire('Error', err.error.msg, 'error');
    });
    console.log(this.loginForm.value);
    

    
  }

  campoNoValido( campo:string ):boolean{

    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

}
