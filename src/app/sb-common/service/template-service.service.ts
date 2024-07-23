import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TemplateConfig } from './template-config.interface';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor() {}

  private config$ = new Subject<TemplateConfig>();
  currentConfig$ = this.config$.asObservable();

  private scrollDown$ = new Subject<boolean>();
  scrollDownEvent$ = this.scrollDown$.asObservable();

  private closeSidenav$ = new Subject<boolean>();
  closeSidenavEvent$ = this.closeSidenav$.asObservable();

  setConfig(config: TemplateConfig) {
    this.config$.next(config);
  }

  requestScrollDown() {
    this.scrollDown$.next(true);
  }

  closeSidenav() {
    this.closeSidenav$.next(true);
  }
}
