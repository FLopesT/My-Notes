import { Injectable } from '@angular/core';
import { RxDocument } from 'rxdb';
import {
  lRResponse,
  loginType,
  registerFormTypes,
} from 'src/app/interfaces/types';
import { RxdbService } from '../rxdbSetup/rxdb.service';
import { UserStatusService } from '../userStatus/user-status.service';

@Injectable({
  providedIn: 'root',
})
export class UserControllerService {
  constructor(
    private rxdbService: RxdbService,
    private userStatus: UserStatusService
  ) {}

  //rxdb Functions--------------------------------------------

  async findOneFunction(key: string | any): Promise<RxDocument<registerFormTypes> | null> {
    return await this.rxdbService.db.usuarios.findOne(key).exec();
  }

  async findAndCompareDoc(property:string, option:number): Promise<any>{
    if(option == 0){
      return await this.rxdbService.db.usuarios.findOne().where('userName').eq(property).exec();
    }
    return await this.rxdbService.db.usuarios.findOne().where('email').eq(property).exec();
  }

  async getUserIdNotes(): Promise<string[]>{
    const idList: Array<string> = [];
    const doc = await this.findAndCompareDoc(this.userStatus.currentUser, 0);
    doc?.notes.map((i:string) => idList.push(i))
    return idList;
  }

  async userLogin(loginContent: loginType): Promise<lRResponse> {
    let dbContent: loginType | any;
    const doc = await this.findAndCompareDoc(loginContent.userName, 0)
    if(!doc){
      return { resp: false, err: 1 }; //error 1 = usuário inexistente
    }
    dbContent = { userName: doc.userName, password: doc.password };
      if (loginContent.password === dbContent.password) {
        this.userStatus.currentUser = loginContent.userName;
        this.userStatus.logged = true;
        return { resp: true, err: 0 };
      }
    return { resp: false, err: 2 }; //error 2 = senha incorreta
  }

  async addNoteId(id: string, user: string) {
    let doc = await this.findAndCompareDoc(user, 0)
    await doc?.update({ $push: { notes: id } });
  }

  async userRegister(content: registerFormTypes): Promise<lRResponse> {
    let userError: boolean = false;
    let emailError: boolean = false;
    if( await this.findAndCompareDoc(content.userName, 0) ){
      userError = true;
    }
    if( await this.findAndCompareDoc(content.email, 1) ){
      emailError = true;
    }
    if (userError) return { resp: false, err: 1 }; //error 1 = usuário já registrado
    if (emailError) return { resp: false, err: 2 }; //error 2 = email já registrado
    await this.rxdbService.db.usuarios.insert(content);
    return { resp: true, err: 0 };
  }
}
