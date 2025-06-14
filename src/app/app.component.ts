import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TemplateService } from './sb-common/service/template-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  isSidenav$: Observable<boolean> = this.templateService.currentConfig$.pipe(
    map((config) => config.sidenavActive),
    shareReplay(),
  );

  isSidenavReady = false;

  constructor(
    private translate: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private templateService: TemplateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.translate.addLangs(['fr']);
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }

  ngOnInit() {
    this.templateService.scrollDownEvent$.subscribe(() => this.scrollDown());
    this.templateService.closeSidenavEvent$.subscribe(() => this.sidenav.close());
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  private scrollDown() {
    setTimeout(() => {
      const element = document.querySelector('#sidenav-content');
      element?.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    }, 0);
  }
}
