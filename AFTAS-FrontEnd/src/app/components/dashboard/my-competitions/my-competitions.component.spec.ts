import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompetitionsComponent } from './my-competitions.component';

describe('MyCompetitionsComponent', () => {
  let component: MyCompetitionsComponent;
  let fixture: ComponentFixture<MyCompetitionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCompetitionsComponent]
    });
    fixture = TestBed.createComponent(MyCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
