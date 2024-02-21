import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCompetitionComponent } from './select-competition.component';

describe('SelectCompetitionComponent', () => {
  let component: SelectCompetitionComponent;
  let fixture: ComponentFixture<SelectCompetitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCompetitionComponent]
    });
    fixture = TestBed.createComponent(SelectCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
