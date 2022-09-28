import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNoteAddComponent } from './sub-note-add.component';

describe('SubNoteAddComponent', () => {
  let component: SubNoteAddComponent;
  let fixture: ComponentFixture<SubNoteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubNoteAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNoteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
