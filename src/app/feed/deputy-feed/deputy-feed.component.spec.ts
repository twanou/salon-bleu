import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputyFeedComponent } from './deputy-feed.component';

describe('DeputyFeedComponent', () => {
  let component: DeputyFeedComponent;
  let fixture: ComponentFixture<DeputyFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeputyFeedComponent]
    });
    fixture = TestBed.createComponent(DeputyFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
