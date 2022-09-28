import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import {  }

//components
import { HeaderComponent } from './header/header.component';
import { NoteAddComponent } from './editComponents/note-add/note-add.component';
import { PublicListComponent } from './noteListComponents/public-list/public-list.component';
import { RecentPublicListComponent } from './noteListComponents/recent-public-list/recent-public-list.component';
import { MyNoteListComponent } from './noteListComponents/my-note-list/my-note-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubNoteAddComponent } from './editComponents/sub-note-add/sub-note-add.component';
import { SelectNoteToAddSubNoteComponent } from './editComponents/select-note-to-add-sub-note/select-note-to-add-sub-note.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NoteAddComponent,
    PublicListComponent,
    RecentPublicListComponent,
    MyNoteListComponent,
    SubNoteAddComponent,
    SelectNoteToAddSubNoteComponent
  ],
  exports: [
    HeaderComponent,
    NoteAddComponent,
    PublicListComponent,
    RecentPublicListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
