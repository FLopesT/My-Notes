import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNoteToAddSubNoteComponent } from './select-note-to-add-sub-note.component';

describe('SelectNoteToAddSubNoteComponent', () => {
  let component: SelectNoteToAddSubNoteComponent;
  let fixture: ComponentFixture<SelectNoteToAddSubNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectNoteToAddSubNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNoteToAddSubNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
