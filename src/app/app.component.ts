import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { TemplateService } from './sb-common/service/template-service.service';
import { TemplateConfig } from './sb-common/service/template-config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  isSidenav$: Observable<boolean> = this.templateService.currentConfig$.pipe(
    map((config) => config.sidenavActive),
    shareReplay(),
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private templateService: TemplateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
