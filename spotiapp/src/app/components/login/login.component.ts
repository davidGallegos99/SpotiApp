import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private login: LoginService,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private router: Router,
    private modal: NzModalService
    ) {
      this.loginForm = this.fb.group({
        correo: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,25}$/)]]
      });
     }
    public loginForm: FormGroup;
    public rutaImg: any;
    ngOnInit(): void {
      this.getRutaImg();
  }
  //      Metodos para acceder a los campos del formulario
  get correo() { return this.loginForm.get('correo')};
  get password() { return this.loginForm.get('password')};

  getValue(e: any){
    console.log(e.target.files[0]);
    const filePath = `images/${this.db.createId()}`;
    console.log(filePath);

    const file = e.target.files[0];
    this.uploadLogo(filePath, file);
  }
  async uploadLogo(filePath: string, file:any) {
   const response = await this.login.uploadLogo(filePath, file);
    if(!response.ok) console.log('no subio ni mierda',response);
    else {
      this.login.uploadLogoC(filePath).then( () => {
      }).catch( error => {
      })
    }
  }
  //    Obtener logo de spotify del storage de firebase
  getRutaImg() {
    // Obtener la ruta donde se encuentra la imagen en el storage de firebase
    this.login.getRutaImLogo().subscribe( async res => {
      // Guardamos en esta propiedad el enlace de la imagen donde ya podemos visualizar la misma
      this.rutaImg = await this.login.obtainImg(res[0].rutaImg);
    });
  }

  signIn() {
    if(this.loginForm.valid){
      const correo = this.correo?.value;
      const password = this.password?.value;
      this.login.signIn(correo, password).then( user => {
        console.log(user);
        this.router.navigate(['home']);
      }).catch( error => {
        console.log(error);
        if(error.code === 'auth/too-many-requests') {
          this.modal.error({
            nzTitle: '<i>Error</i>',
            nzContent: '<b>Cuenta deshabilitada temporalmente debido a repetidos intentos erroneos de acceder a la cuenta</b>',
            nzOkText: 'Aceptar',
          })
        }

        if(error.code === 'auth/user-not-found') {
          this.modal.error({
            nzTitle: '<i>Error</i>',
            nzContent: '<b>Email invalido</b>',
            nzOkText: 'Aceptar',
          })
        }

        if(error.code === 'auth/wrong-password') {
          this.modal.error({
            nzTitle: '<i>Error</i>',
            nzContent: '<b>Contrasena incorrecta</b>',
            nzOkText: 'Aceptar',
          })
        }
      });
    }
  }

}
