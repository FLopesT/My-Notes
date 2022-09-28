import { Component, OnInit } from '@angular/core';
import { LoginUrlToolService } from '../authentication/login/login-url-tool.service';
import { UserStatusService } from 'src/app/services/userStatus/user-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private loginUrlToll: LoginUrlToolService,
    private userStatusService: UserStatusService
  ) {}

  ngOnInit(): void {}

  get getUserStatus(){
    return this.userStatusService.logged;
  }

  public getFinalUrl() {
    if (!this.userStatusService.logged) this.loginUrlToll.goToHome = true;
  }
}
