import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteControllerService } from 'src/app/services/controllers/note-controller.service';

@Component({
  selector: 'app-sub-note-page',
  templateUrl: './sub-note-page.component.html',
  styleUrls: ['./sub-note-page.component.css']
})
export class SubNotePageComponent implements OnInit {

  public id: string = this.activatedRoute.snapshot.params['id'];
  public subId: string  = this.activatedRoute.snapshot.params['subid'];
  public note: any;
  public subNote: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private noteController: NoteControllerService
  ) { }

  ngOnInit(): void {
    this.getContent();
  }

  async getContent(){
    this.note = await this.noteController.getNote(this.id);
    this.subNote = await this.noteController.getSubNote(this.id, this.subId);
  }

}
