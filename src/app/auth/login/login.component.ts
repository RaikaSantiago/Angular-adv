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
    email: new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email]),
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

  // onSignIn(googleUser:any) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  // onSuccess(googleUser:any){
  //   console.log('google perfil', googleUser.getBasicProfile());
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log('Token:',id_token);
    
  // }
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

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '557293408583-huol63oiu3vsq1hh768jtoqh7bde7pgn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element:any) {

    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
              var id_token = googleUser.getAuthResponse().id_token;
              this.usuarioService.loginGoogle(id_token).subscribe((res:any) => {
                localStorage.setItem('token', res.token);
                this.ngZone.run(() => {
                  /*Navergar al Dashboard */
                  this.router.navigateByUrl('/');
                });
              });
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

}
