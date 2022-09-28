import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addNoteFormTypes } from 'src/app/interfaces/types';
import { NoteControllerService } from 'src/app/services/controllers/note-controller.service';

@Component({
  selector: 'app-my-note-list',
  templateUrl: './my-note-list.component.html',
  styleUrls: ['./my-note-list.component.css'],
})
export class MyNoteListComponent implements OnInit {

  public selectNote:boolean = false;
  public paginaAtual: number = 1;
  public selecionado: string = 'public';
  public notes: Array<addNoteFormTypes> = [];
  public publicList: Array<addNoteFormTypes> = [];
  public privateList: Array<addNoteFormTypes> = [];
  public links:string[] = ["/note/{{item.noteId}}","/dashboard/addsubnote/{{item.noteId}}"]

  constructor(private noteController: NoteControllerService, private router: Router) {
    this.getNotes();
    if(this.router.url == "/dashboard/selectnote")
    this.selectNote = true;
  }

  ngOnInit(): void {}

  async getNotes(): Promise<void> {

    this.notes = await this.noteController.getMyNotes();

    this.notes.map( item=>{
      if(item.private){
        this.privateList.push(item)
      }else{
        this.publicList.push(item)
      }
    })

  }

  public selectRoute(id:string){
    if(this.selectNote)
      this.router.navigate(["/dashboard/addsubnote/"+id]);
    else
      this.router.navigate(["/note/"+id]);
  }

  public notesChange() {
    console.log(this.selecionado);
    this.paginaAtual = 1;
  }
}
