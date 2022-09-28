import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addNoteFormTypes, lRResponse, registerFormTypes } from 'src/app/interfaces/types';
import { UserControllerService } from 'src/app/services/controllers/user-controller.service';
import { UserStatusService } from 'src/app/services/userStatus/user-status.service';
import { LoginUrlToolService } from '../login/login-url-tool.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  //valores de input
  public passWordInput: string = ""
  public passWordInput2: string = ""
  public userNameInput : string =""

  //habilita de desabilita botão de registro
  public dButton: boolean = true;

  //erros por conflito de dados
  public emailError: boolean = false;
  public userNameError: boolean = false;

  //erros por ter espaço no input
  public spaceError:boolean = false;
  public nameSpaceError:boolean = false;
  public userNameSpaceError:boolean = false;
  public lastNameSpaceError:boolean = false;
  public emailSpaceError:boolean = false;
  public passwordSpaceError:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userState: UserStatusService,
    private userController: UserControllerService
  ) {}

  ngOnInit(): void {
    if (this.userState.logged) this.router.navigateByUrl('/');
  } //se usuario já estiver logado, redirecionaremos para home

  public registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required,Validators.minLength(2)]],
    lastName: ['', [Validators.required,Validators.minLength(2)]],
    userName: ['', [Validators.required,Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: [''],
  });

  //funções para avisar que existem espaços nos formulários
  public space(str:string): boolean{
    let index = 0;
    let result:boolean = false;
    while(index < str.length){
      if(str.charAt(index) == " "){
        result = true;
      }
      index++
    }
    return result
  }

  public spaceCheck(registerContent:addNoteFormTypes|any){
    let temespacoTool:boolean = false;
    if(this.space(registerContent.userName)){
      this.userNameSpaceError = true;
      temespacoTool = true;
    }
    if(this.space(registerContent.name)){
      this.nameSpaceError = true;
      temespacoTool = true;
    }
    if(this.space(registerContent.lastName)){
      this.lastNameSpaceError = true;
      temespacoTool = true;
    }
    if(this.space(registerContent.email)){
      this.emailSpaceError = true;
      temespacoTool = true;
    }
    if(this.space(registerContent.password)){
      this.passwordSpaceError = true;
      temespacoTool = true;
    }
    if(temespacoTool){
      return true;
    }
    return false;
  }

  async submitRegisterForm():Promise<boolean>{
    this.spaceError = false
    this.emailError = false;
    this.userNameError = false;
    const registerContent: registerFormTypes = {
      userName: this.registerForm.value.userName,
      name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      notes: [],
    };

    if(this.spaceCheck(registerContent)){
      return this.spaceError = true
    }

    let response: lRResponse = { resp: false, err: 0 };
    response = await this.userController.userRegister(registerContent);
    if (response.resp) return this.router.navigate(['/login']);
    if(response.err == 2){
      this.registerForm.value.email = ""
      return this.emailError = true;
    }else{
      return this.userNameError = true;
    }
  }

  checkUserName() {
    if(this.userNameError)this.userNameError = false;
    if(this.userNameSpaceError)this.userNameSpaceError = false;
  }

  checkEmail() {
    if(this.emailError)this.emailError = false
  }

  public checkForm(): void {
    if ( this.registerForm.valid && this.passWordInput == this.passWordInput2 )
      this.dButton = false;
    else {
      if (!this.dButton) {
        this.dButton = true;
      }
    }
  }
}
