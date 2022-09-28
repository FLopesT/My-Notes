import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPublicListComponent } from './recent-public-list.component';

describe('RecentPublicListComponent', () => {
  let component: RecentPublicListComponent;
  let fixture: ComponentFixture<RecentPublicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPublicListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPublicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
