import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
//services
import { RxdbService } from '../rxdbSetup/rxdb.service';
//libs
const { v4: uuidv4 } = require('uuid');

//interface
import {
  addDateTypes,
  addNoteForm,
  addNoteFormTypes,
  addSubNoteForm,
  addSubNoteFormTypes,
  commentType,
  RecentNotes,
  recentNotesTypes,
} from 'src/app/interfaces/types';
import { UserStatusService } from '../userStatus/user-status.service';
import { UserControllerService } from './user-controller.service';
import { RxDocument } from 'rxdb';
import { ControllerToolsService } from './controller-tools.service';

@Injectable({
  providedIn: 'root',
})
export class NoteControllerService {
  public addEmitEvent = new EventEmitter();

  public data: addDateTypes | undefined;

  constructor(
    private rxdbService: RxdbService,
    private userStatus: UserStatusService,
    private userController: UserControllerService,
    private controlerTools: ControllerToolsService,
    private router: Router
  ) {}

  //rxdb functions----------------------------------------------

  async findOneNote(id: string): Promise<RxDocument<addNoteFormTypes> | null | any> {
    return this.rxdbService.db.anotacoes.findOne().where('noteId').eq(id).exec();
  }

  async getNote(id: string): Promise<addNoteFormTypes> {
    const doc: addNoteFormTypes|any = await this.findOneNote(id);
    return doc;
  }

  async getSubNote(id:string, subId:string){
    const doc: addNoteFormTypes|any = await this.findOneNote(id);
    const subDocs:any[] = doc.subNotes;
    let subDoc:any;
    subDocs.forEach(item=>{
      if(item.subNoteId == subId){
        subDoc = item;
      }
    });
    return subDoc;
  }

  async getPublicNotes(): Promise<addNoteFormTypes[]> {
    const contentList: addNoteFormTypes[] = [];
    let doc = await this.rxdbService.db.anotacoes
    .find({ selector: { private: false } }).exec();
    doc.map((d:any) => {
      contentList.push(d);
    })
    this.controlerTools.ordemDeData(contentList);
    return contentList;
  }

  async addNoteDoc(note: addNoteFormTypes|any) {
    await this.rxdbService.db.anotacoes.insert(note);
    await this.userController.addNoteId(note.noteId, note.creator);
  }

  async getMyNotes(): Promise<addNoteFormTypes[]> {
    let noteList: addNoteFormTypes[] = [];
    //let idList: string[] = [];
    const idList: string[] = await this.userController.getUserIdNotes();
    for (let i of idList) {
      const doc: addNoteFormTypes|any = await this.findOneNote(i);
      noteList.push(doc);
    }
    this.controlerTools.ordemDeData(noteList);
    return noteList;
  }

  async getRecentNotes(): Promise<any> {
    const ids: recentNotesTypes[] = await this.getRecentNotesIds();
    let contentList: addNoteFormTypes[] = [];
    //ids = await this.getRecentNotesIds();
    for (let i of ids) {
      const doc: addNoteFormTypes|any = await this.findOneNote(i.id);
      contentList.push(doc)
    }
    this.controlerTools.ordemDeData(contentList);
    return contentList;
  }

  async getRecentNotesIds(): Promise<any> {
    //let ids:any;
    const doc :RecentNotes|any = await this.rxdbService.db.recentes.findOne('unic').exec();
    const ids:any = doc.notes;
    return ids;
  }

  async recentNotesAtt(id:string, date:number): Promise<RxDocument<{ banco: string; notes: { id?: string | undefined; dateNumber?: number | undefined; }[]; }, {}> | null> {

    const ids: any[] = await this.getRecentNotesIds();
    let restart:boolean = false;
    let result:recentNotesTypes[] = []; // tive que criar outro objeto, pois recebia um erro que não consegui resolver

    ids.map((item:recentNotesTypes)=>{ //verificanto se item já existe na lista
      if(id == item.id){
        restart = true;
      }
    });
    if(restart){ //entra aqui para não duplicar uma anotação em anotações recentes
      result = await this.restartRecentNotes();
      result[0].dateNumber = date;
    }else{
      result.push(ids[1]);  //aqui retiramos o id de anotação mais antiga e adicionamos o mais novo
      result.push(ids[2]);
      result.push({
        id:id,
        dateNumber:date
      });
    }
    return await this.rxdbService.db.recentes
      .findOne('unic')
      .update({
        $set: { notes: result }
      })
  }

  async restartRecentNotes(): Promise<recentNotesTypes[]>{
    const notes: addNoteFormTypes[] = await this.getPublicNotes();
    const recentNotes: recentNotesTypes[] = [
      {id:notes[0].noteId, dateNumber:notes[0].dateNumber},
      {id:notes[1].noteId, dateNumber:notes[1].dateNumber},
      {id:notes[2].noteId, dateNumber:notes[2].dateNumber}
    ];
    return recentNotes;
  }

  async getCreatorName(id:string): Promise<string>{
    const doc = await this.getNote(id);
    return doc.creator;
  }

  async checkPrivate(id:string): Promise<boolean>{
    let doc = await this.getNote(id);
    if(doc.private){
      return true;
    }
    return false;
  }

  async addComment(id: string, comment: string, commentList: commentType[]){
    const date: addDateTypes = this.controlerTools.getDateFunction();
    const finalComment: commentType = {
      commentId: uuidv4(),
      content: comment,
      creator: this.userStatus.currentUser,
      dateNumber: date.dateNumber,
      dateString: date.dateString,
      hour: date.hour,
    };
    commentList = Object.assign([], commentList);
    commentList.push(finalComment);
    this.controlerTools.ordemDeData(commentList);
    await this.rxdbService.db.anotacoes.findOne(id).update({$set: { comments: commentList }});
    return commentList;
  }

   async addSubNoteDoc(parentId:string, note:addSubNoteFormTypes): Promise<string>{
     let parentNote:any = await this.getNote(parentId);
     const data: addDateTypes = await this.controlerTools.getDateFunction();
      await parentNote.update({
        $push:{
          subNotes: note
        },
        $set:{
          hour: data.hour,
          dateNumber: data.dateNumber,
          dateString: data.dateString
        }
      })
     await this.recentNotesAtt(parentId, parentNote.dateNumber);
     return note.subNoteId;
   }

  //no rxdb functions----------------------------------------------

  async addSubNote(parentId:string, cont: addSubNoteForm){
     const date: addDateTypes = this.controlerTools.getDateFunction();
     const contentPv: string = this.controlerTools.getContentPreView(cont.content);
     const subNoteContent:addSubNoteFormTypes = {
       subNoteId: uuidv4(),
       subNoteName: cont.subNoteName,
       hour: date.hour,
       dateNumber: date.dateNumber,
       dateString: date.dateString,
       content: cont.content,
       contentPreview: contentPv,
       comments: []
     }
     return await this.addSubNoteDoc(parentId, subNoteContent);
   }

  async addNote(cont: addNoteForm): Promise<string> {
    const date: addDateTypes = this.controlerTools.getDateFunction();
    const contentPv: string = this.controlerTools.getContentPreView(cont.content);
    const noteContent: addNoteFormTypes = {
      noteId: uuidv4(),
      noteName: cont.noteName,
      hour: date.hour,
      dateNumber: date.dateNumber,
      dateString: date.dateString,
      content: cont.content,
      contentPreview: contentPv,
      comments: [],
      subNotes: [],
      creator: this.userStatus.currentUser,
      private: cont.private,
    };
    if (!noteContent.private) { //se anotação for pública ela entra nas anotações públicas recentes
      this.recentNotesAtt(noteContent.noteId, noteContent.dateNumber);
    }
    await this.addNoteDoc(noteContent);
    return noteContent.noteId;
  }

}
