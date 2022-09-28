import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  public currentUser: string = '';
  public logged: boolean = false;

  constructor() { }
}
