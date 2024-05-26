import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCardComponent } from './subject-card.component';

describe('SubjectCardComponent', () => {
  let component: SubjectCardComponent;
  let fixture: ComponentFixture<SubjectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectCardComponent]
    });
    fixture = TestBed.createComponent(SubjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
