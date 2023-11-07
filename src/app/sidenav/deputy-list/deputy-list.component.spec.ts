import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputyListComponent } from './deputy-list.component';

describe('DeputyListComponent', () => {
  let component: DeputyListComponent;
  let fixture: ComponentFixture<DeputyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeputyListComponent]
    });
    fixture = TestBed.createComponent(DeputyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
