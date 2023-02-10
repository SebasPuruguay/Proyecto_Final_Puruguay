import { Component, EventEmitter, Output } from '@angular/core';
import {NgForm} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  constructor(private router: Router){}


  guardarPost(f: NgForm){
    if(f.value.inputUser!=''){
      this.router.navigate(['./contacto']);
      alert("Sugerencia enviada exitosamente")
      return
    }
    alert("Ingrese sus sugerencias")
  }
}

