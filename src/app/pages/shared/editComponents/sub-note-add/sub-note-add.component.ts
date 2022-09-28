import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { addSubNoteForm, privateResult } from 'src/app/interfaces/types';
import { NoteControllerService } from 'src/app/services/controllers/note-controller.service';
import { UserStatusService } from 'src/app/services/userStatus/user-status.service';

@Component({
  selector: 'app-sub-note-add',
  templateUrl: './sub-note-add.component.html',
  styleUrls: ['./sub-note-add.component.css']
})
export class SubNoteAddComponent implements OnInit {

  constructor(
    private controller: NoteControllerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userStatus: UserStatusService
  ) {
    this.getNote()
  }

  public dButton: boolean = true;
  public id:string = this.activatedRoute.snapshot.params['id'];

  public subNoteForm: FormGroup = this.formBuilder.group({
    noteName: ['', Validators.required],
    content: ['', Validators.required],
    private: [false],
  });

  ngOnInit(): void {}

  async submitNoteForm() {
    const tf = this.subNoteForm.value;
    const cont: addSubNoteForm = {
      subNoteName: tf.noteName,
      content: tf.content
    };
    const subNoteId:string = await this.controller.addSubNote(this.id, cont);
    return this.router.navigate([`subnote/${this.id}/${subNoteId}`]);
  }

  public checkContent() {
    if (this.subNoteForm.valid) {
      this.dButton = false;
    } else {
      if (!this.dButton) {
        this.dButton = true;
      }
    }
  }

  public cancel() {
    console.log('saindo');
  }

  public note:any;

  async getNote(): Promise<boolean | void> {
    const noteCreator:string = await this.controller.getCreatorName(this.id)
      if (this.userStatus.logged) {
        if (this.userStatus.currentUser != noteCreator) {
          return this.router.navigate(['dashboard/selectnote']);
        }
      } else {
        return this.router.navigate(['']);
      }
    this.note = await this.controller.getNote(this.id);
    return console.log('criador verificado');
  }

}

