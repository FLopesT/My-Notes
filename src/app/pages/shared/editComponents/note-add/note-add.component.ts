import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//services
import { NoteControllerService } from 'src/app/services/controllers/note-controller.service';
//interfaces
import { addNoteForm } from 'src/app/interfaces/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css'],
})
export class NoteAddComponent implements OnInit {
  constructor(
    private controller: NoteControllerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public dButton: boolean = true;

  public noteForm: FormGroup = this.formBuilder.group({
    noteName: ['', Validators.required],
    content: ['', Validators.required],
    private: [false],
  });

  ngOnInit(): void {

  }


  async submitNoteForm() {
    let tf = this.noteForm.value;
    let cont: addNoteForm = {
      noteName: tf.noteName,
      content: tf.content,
      private: tf.private,
    };
    console.log(cont);
    let id : any = await this.controller.addNote(cont);
    console.log(id)
    return this.router.navigate(['/note/'+id]);
  }

  public checkContent() {
    if (this.noteForm.valid) {
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
}
