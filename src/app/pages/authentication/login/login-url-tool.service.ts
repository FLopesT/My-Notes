import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginUrlToolService {


  public goToHome:boolean = false;
  public homeUrl:string = "dashboard/publiclist";
  public currentUrl:string = "/"

  constructor(private router:Router) { }

  public setCurrentUrl(){ //pega url em que usuário estava antes de ir para página de login
    this.currentUrl = this.router.url;
  }

}
