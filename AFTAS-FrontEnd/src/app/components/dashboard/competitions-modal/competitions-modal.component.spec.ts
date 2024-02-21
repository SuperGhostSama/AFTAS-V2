import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsModalComponent } from './competitions-modal.component';

describe('CompetitionsModalComponent', () => {
  let component: CompetitionsModalComponent;
  let fixture: ComponentFixture<CompetitionsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetitionsModalComponent]
    });
    fixture = TestBed.createComponent(CompetitionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
