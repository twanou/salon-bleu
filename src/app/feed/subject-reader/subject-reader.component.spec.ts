import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectReaderComponent } from './subject-reader.component';

describe('SubjectReaderComponent', () => {
  let component: SubjectReaderComponent;
  let fixture: ComponentFixture<SubjectReaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectReaderComponent]
    });
    fixture = TestBed.createComponent(SubjectReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
