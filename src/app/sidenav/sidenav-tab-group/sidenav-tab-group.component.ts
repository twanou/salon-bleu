import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SearchCriteria } from '../search-criteria-service/search-criteria.interface';
import { SearchCriteriaService } from '../search-criteria-service/search-criteria.service';

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
  private isSearchCriteriaEmpty: boolean = true;

  constructor(private router: Router, private searchCriteriaService: SearchCriteriaService) {}

  ngOnInit(): void {
    this.searchCriteriaService.searchCriterias$
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchCriteria: SearchCriteria) => {
        this.isSearchCriteriaEmpty = searchCriteria.isEmpty();
        if (!this.isSearchCriteriaEmpty) {
          this.router.navigate([this.route[1]]);
        }
      });
  }

  selectedTabChange(event: MatTabChangeEvent) {
    if (event.index === 1 && !this.isSearchCriteriaEmpty) {
      this.router.navigate([this.route[1]]);
    } else if (event.index !== 1) {
      this.router.navigate([this.route[event.index]]);
    }
  }

  getSelectedIndex() {
    return this.route.indexOf(this.router.url);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
