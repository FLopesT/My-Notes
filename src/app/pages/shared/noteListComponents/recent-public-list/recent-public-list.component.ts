import { Component, OnInit } from '@angular/core';
import { addNoteFormTypes } from 'src/app/interfaces/types';
import { NoteControllerService } from 'src/app/services/controllers/note-controller.service';

@Component({
  selector: 'app-recent-public-list',
  templateUrl: './recent-public-list.component.html',
  styleUrls: ['./recent-public-list.component.css']
})
export class RecentPublicListComponent implements OnInit {

  constructor(private notesController:NoteControllerService) {
    this.startList()
  }

  public contentList: Array<addNoteFormTypes>|any;

  async startList (): Promise<void>{
    this.contentList = await this.notesController.getRecentNotes();
  }

  ngOnInit(): void {
  }

}
