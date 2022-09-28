import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicListComponent } from './public-list.component';

describe('PublicListComponent', () => {
  let component: PublicListComponent;
  let fixture: ComponentFixture<PublicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
