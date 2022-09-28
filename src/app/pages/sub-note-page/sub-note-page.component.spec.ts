import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNotePageComponent } from './sub-note-page.component';

describe('SubNotePageComponent', () => {
  let component: SubNotePageComponent;
  let fixture: ComponentFixture<SubNotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubNotePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
