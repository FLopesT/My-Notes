import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { NotesDashboardComponent } from './pages/notes-dashboard/notes-dashboard.component';
import { PublicListComponent } from './pages/shared/noteListComponents/public-list/public-list.component';
import { NoteAddComponent } from './pages/shared/editComponents/note-add/note-add.component';
import { AuthGuard } from './guards/shared/auth.guard';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { MyNoteListComponent } from './pages/shared/noteListComponents/my-note-list/my-note-list.component';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { SubNoteAddComponent } from './pages/shared/editComponents/sub-note-add/sub-note-add.component';
import { SelectNoteToAddSubNoteComponent } from './pages/shared/editComponents/select-note-to-add-sub-note/select-note-to-add-sub-note.component';
import { SubNotePageComponent } from './pages/sub-note-page/sub-note-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'note/:id', component: NotePageComponent },
  { path: 'subnote/:id/:subid', component: SubNotePageComponent},
  {
    path: 'dashboard',
    component: NotesDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'selectnote', component: SelectNoteToAddSubNoteComponent },
      { path:'addsubnote/:id',component: SubNoteAddComponent },
      { path: 'publiclist', component: PublicListComponent },
      { path: 'newnote', component: NoteAddComponent },
      { path: 'mynoteslist', component: MyNoteListComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
