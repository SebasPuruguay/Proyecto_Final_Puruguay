import { Component } from '@angular/core';
import {NgForm} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private router: Router){}
  submit(f: NgForm){
    if(f.value.email!='' && f.value.pwd!='' && f.value.name!='' && f.value.lastname!=''){
      console.log('Registro concretado')
      console.log('Nombres:',f.value.name)
      console.log('Apellido:',f.value.lastname)
      console.log('Email:',f.value.email)
      console.log('Contraseña:',f.value.pwd)
      alert("Registro exitoso")
      this.router.navigate(['./home']);

      return
    }
    alert("Ingrese sus crendenciales")
  }

}
