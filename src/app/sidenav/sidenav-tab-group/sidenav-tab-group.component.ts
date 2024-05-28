import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'sb-sidenav-tab-group',
  templateUrl: './sidenav-tab-group.component.html',
  styleUrl: './sidenav-tab-group.component.scss',
})
export class SidenavTabGroupComponent implements OnInit, OnDestroy {
  @Output()
  public isLoaded = new EventEmitter<boolean>();

  private route: string[] = ['/fil', '/recherche'];
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  selectedTabChange(event: MatTabChangeEvent) {
    this.router.navigate([this.route[event.index]]);
  }

  getSelectedIndex() {
    return this.route.indexOf(this.router.url);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
