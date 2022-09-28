import { Component, OnInit } from '@angular/core';
import { addNoteFormTypes } from 'src/app/interfaces/types';
import { NoteControllerService } from 'src/app/services/controllers/note-controller.service';
import { RxdbService } from 'src/app/services/rxdbSetup/rxdb.service';

@Component({
  selector: 'app-public-list',
  templateUrl: './public-list.component.html',
  styleUrls: ['./public-list.component.css'],
})
export class PublicListComponent implements OnInit {

  public contentList: Array<addNoteFormTypes> | any = [] ;
  public paginaAtual: number = 1;

  constructor(private noteController: NoteControllerService, private pai:RxdbService) {
    this.startList()
  }

  async startList (): Promise<void>{
    this.contentList =  await this.noteController.getPublicNotes();
  }

  ngOnInit(): void {
  }
}
