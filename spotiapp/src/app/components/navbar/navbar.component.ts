import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { NzModalComponent, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
      private modal: NzModalService,
      private login: LoginService,
      private router: Router,
      private auth: AngularFireAuth
    ) { }

  public auntenticated: any = null;

  ngOnInit(): void {
    this.auth.authState.subscribe(res=>{
      this.auntenticated = {...res};
      console.log(res);
      if (!this.auntenticated.email) {
        this.router.navigate(['login']);

      }
    })
  }

  showLogoutModal(){
    this.modal.confirm({
      nzTitle: '<i>Cerrar sesion</i>',
      nzContent: '<b>Seguro que quieres cerrar sesion?</b>',
      nzOkText: 'Salir',
      nzCancelText: 'Cancelar',
      nzOnOk: () => {
        this.logout();
      }
    })
  }

  logout(){
    this.login.logout().then( res => {
      console.log(res);
      this.router.navigate(['login']);
    })
  }
}
