import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lRResponse, loginType } from 'src/app/interfaces/types';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/services/controllers/user-controller.service';
import { LoginUrlToolService } from './login-url-tool.service';
import { UserStatusService } from 'src/app/services/userStatus/user-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public dButton: boolean = true;
  public userNameError = false;
  public passwordError = false;
  public passwordLengthError = false;
  public userNameLengthError = false;

  public error: boolean = false;

  public userNameInput: string = "flopest";
  public passwordInput: string = '12345678';
  //userpassword será apagado se senha estiver incorreta

  public loginForm: FormGroup = this.formBuilder.group({
    account: ['flopest', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userController: UserControllerService,
    private urlTools: LoginUrlToolService,
    private userState: UserStatusService
  ) {}

  ngOnInit(): void {
    if (this.userState.logged) this.router.navigate(['/']); //se usuario já estiver logado, redirecionaremos para home
    this.dButton = false;
    //this.dButton = false só para ajudar nos testes
  }

  async submitLoginForm(): Promise<any> {
    const dados: loginType = {
      userName: this.loginForm.value.account,
      password: this.loginForm.value.password,
    };

    const response: lRResponse = await this.userController.userLogin(dados);
    if (response.resp) {
      //se login foi afetuado a partir da opção "navegar pelas anotações", retonaremos para home
      if (this.urlTools.goToHome) {
        this.urlTools.goToHome = false;
        return this.router.navigate([this.urlTools.homeUrl]);
      }
      this.urlTools.goToHome = false;
      this.router.navigate([this.urlTools.currentUrl]);
      return this.urlTools.currentUrl = "";
    }
    if (response.err == 1) {
      this.userNameError = true;
    } else this.passwordError = true;
    this.passwordInput = '';
    return this.dButton = true;
  }

  public checkUserName() {

    if(this.userNameInput.length >= 5 || this.userNameInput.length==0){
      this.userNameLengthError = false;
    }else{
      this.userNameLengthError = true;
    }
    if(this.userNameError){
      this.userNameError = false;
    }
  }

  public checkPassword() {
    if(this.passwordInput.length >= 8 || this.passwordInput.length ==0){
      this.passwordLengthError = false;
    }else{
      this.passwordLengthError = true;
    }
    if(this.passwordError){
      this.passwordError = false;
    }
  }

  public checkContent() {
    if (this.loginForm.valid) {
      this.dButton = false;
    } else {
      if (!this.dButton) {
        this.dButton = true;
      }
    }
  }
}
