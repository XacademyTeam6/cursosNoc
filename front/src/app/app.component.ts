import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  forma!:FormGroup;

    constructor(private fb:FormBuilder){

      this.CrearFormulario();
    
    }
    get firstNameNoValido(){
      
      return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
    }
    get lastNameNoValido(){
      
      return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
    }
    get emailNoValido(){
      
      return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
    }
    get passwordNoValido(){
      
      return this.forma.get('password')?.invalid && this.forma.get('password')?.touched;
    }
    
    CrearFormulario(){
      this.forma= this.fb.group({
        nombre:['',[ Validators.required , Validators.minLength(3), Validators.pattern('[a-zA-z]')]],
        apellido:['', [Validators.required , Validators.minLength(3), Validators.pattern('[a-zA-z]')]],
        correo:['', [Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password:['', [Validators.required, Validators.minLength(8)]],
      })

    }
    guardar(){
      console.log(this.forma);
    }
    limpiar(){
       this.forma.reset();
    }

} 
  

