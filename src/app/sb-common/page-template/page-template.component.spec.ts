import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemplateComponent } from './page-template.component';

describe('PageTemplateComponent', () => {
  let component: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageTemplateComponent]
    });
    fixture = TestBed.createComponent(PageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
