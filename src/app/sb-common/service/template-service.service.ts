import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TemplateConfig } from './template-config.interface';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor() {}

  private config$ = new Subject<TemplateConfig>();
  currentConfig$ = this.config$.asObservable();

  setConfig(config: TemplateConfig) {
    this.config$.next(config);
  }
}
