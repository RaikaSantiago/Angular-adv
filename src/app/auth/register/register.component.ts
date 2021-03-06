import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AbstractControl, FormBuilder, FormControl, 
         FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegistroModel } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

export const fnpasswordsIguales: ValidatorFn = (control: AbstractControl):ValidationErrors | null => {
 
    const pass1Control = control.get('password');
    const pass2Control = control.get('confirmPassword');
 
    return ((pass1Control != null || pass2Control) && pass1Control.value !== pass2Control.value) ? {
        contrasenasIguales: 'no es correcto',
        msg: 'Revisar validacion de contraseñas'
 
    } : null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm: FormGroup = new FormGroup({
    nombre: new FormControl ('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl ('', Validators.required),
    confirmPassword: new FormControl ('', Validators.required),
    terminos: new FormControl (false, Validators.required)
  },{ 
    validators: fnpasswordsIguales 
  });


  constructor(private usuarioService: UsuarioService,
              private router:Router) { }

  ngOnInit(): void {
  }
  crearUsuario(){
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    /*Realizar el posteo */
    this.usuarioService.crearUsuario( this.registerForm.value).toPromise().then((res:RegistroModel) => {
     
      if (res !== null) {

        Swal.fire({
          icon: 'success',
          title: 'Te has registrado exitosamente',
          showConfirmButton: false,
          timer: 2500
        });
          localStorage.setItem('token', res.token);
          localStorage.setItem('uid',res.usuario.uid);
          localStorage.setItem('menu', JSON.stringify(res.menu));
          this.router.navigateByUrl('/');
      }
      
        
    },err => {
      /*Mensaje error */
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
  campoNoValido( campo:string ):boolean{

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  aceptarTerminos():boolean{
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas():boolean{
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('confirmPassword').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    }
    return false;
  }

  passwordsIguales(pass1:string, pass2:string){
    return (formGroup: FormGroup)=>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({ noEsIgual:true })
      }
    }
  }
}
