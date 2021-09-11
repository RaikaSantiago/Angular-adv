import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
declare var gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.Component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2:any;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email') && localStorage.getItem('remember')  || '', [Validators.required, Validators.email]),
    password: new FormControl ('', Validators.required),
    remember: new FormControl (localStorage.getItem('remember') || false )
  });
  
  constructor(private router:Router,
              private usuarioService: UsuarioService,
              private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton();
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
 
    
  }

  campoNoValido( campo:string ):boolean{

    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  renderButton(){
    gapi.signin2.render('my-signin2',{
      'scope': 'profile email',
      'width': 240,
      'height':50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element:any) {

    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
              var id_token = googleUser.getAuthResponse().id_token;
              this.usuarioService.loginGoogle(id_token).subscribe((res:any) => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('email', googleUser.Ws.Ht);
                localStorage.setItem('nombre', googleUser.Ws.Qe);
                
                this.ngZone.run(() => {
                  /*Navergar al Dashboard */
                  this.router.navigateByUrl('/');
                });
              });
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
