import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberCompetitionComponent } from './add-member-competition.component';

describe('AddMemberCompetitionComponent', () => {
  let component: AddMemberCompetitionComponent;
  let fixture: ComponentFixture<AddMemberCompetitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMemberCompetitionComponent]
    });
    fixture = TestBed.createComponent(AddMemberCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
