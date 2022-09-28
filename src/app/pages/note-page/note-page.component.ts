import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addNoteFormTypes, commentType } from 'src/app/interfaces/types';
import { NoteControllerService } from 'src/app/services/controllers/note-controller.service';
import { UserStatusService } from 'src/app/services/userStatus/user-status.service';

@Component({
  selector: 'app-note-pagee',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.css'],
})
export class NotePageComponent implements OnInit {
  public note: addNoteFormTypes | any;
  public isLoading: boolean = false;
  public paginaAtual: number = 1;
  public commentList: commentType[] = []
  public comentario: string = '';
  public id:string = this.activatedRoute.snapshot.params['id']

  constructor(
    private activatedRoute: ActivatedRoute,
    private noteservice: NoteControllerService,
    private router: Router,
    private userStatus: UserStatusService
  ) {
    this.getUserStatus;
    this.getNote();
  }

  get getUserStatus() {
    return this.userStatus.logged;
  }

  async getComment(){
    const c:string = this.comentario.trim()
    if (c.length > 0) {
      this.commentList = await this.noteservice.addComment(this.note.noteId, c, this.commentList);
      this.comentario = "";
    }
  }

  public getContent(){
    // let coisa = $document('#teta')
    //console.log(coisa)
  }

  async getNote(): Promise<boolean | void> {
    const privateNote:boolean = await this.noteservice.checkPrivate(this.id);
    const noteCreator:string = await this.noteservice.getCreatorName(this.id);
    if(privateNote){  //redireciona usuários caso não tenha permissão de acessar essa anotação
      if(this.userStatus.logged){
        if(this.userStatus.currentUser != noteCreator){
          console.log("anotação privada")
          return this.router.navigate(['dashboard/publiclist']);
        }
        this.note = await this.noteservice.getNote(this.id);
      }else{
        console.log("anotação privada")
        return this.router.navigate(['']);
      }
    }
    this.note = await this.noteservice.getNote(this.id);
    this.isLoading = true;
    this.commentList = this.note.comments;
    this.getContent();
    return console.log('anotação carregada');
  }

  ngOnInit(): void {}
}
