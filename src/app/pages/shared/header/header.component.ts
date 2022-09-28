import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/shared/auth.guard';
import { UserStatusService } from 'src/app/services/userStatus/user-status.service';
import { LoginUrlToolService } from '../../authentication/login/login-url-tool.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private userStatus: UserStatusService,
    private auth: AuthGuard,
    private loginUrlTool: LoginUrlToolService
  ) {}

  get getUserStatus(){
    return this.userStatus;
  }

  get getUrlTool(){ // pegando loginurltool, para ultilizar função que pega em que página estamos antes de efetuar login
    return this.loginUrlTool;
  }

  ngOnInit(): void {}

  public sair() {
    return this.auth.exitFunction();
  }

}
