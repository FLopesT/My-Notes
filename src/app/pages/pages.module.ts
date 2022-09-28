import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

//components
import { HomeComponent } from './home/home.component';
import { NotesDashboardComponent } from './notes-dashboard/notes-dashboard.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NotePageComponent } from './note-page/note-page.component';
import { SubNotePageComponent } from './sub-note-page/sub-note-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    NotesDashboardComponent,
    LoginComponent,
    RegisterComponent,
    NotePageComponent,
    SubNotePageComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports:[
    HomeComponent,
    NotesDashboardComponent
  ]
})
export class PagesModule { }
