import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SearchCriteria } from 'src/app/sidenav/search-criteria-service/search-criteria.interface';
import { SearchCriteriaService } from 'src/app/sidenav/search-criteria-service/search-criteria.service';
import { FeedPagerComponent } from '../feed-pager/feed-pager.component';

@Component({
  selector: 'sb-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrl: './search-feed.component.scss',
})
export class SearchFeedComponent implements AfterViewInit, OnDestroy {
  public searchCriteria: SearchCriteria = new SearchCriteria();
  public pageSize = 25;
  private destroy$ = new Subject<void>();

  @ViewChild(FeedPagerComponent) feedPager!: FeedPagerComponent;

  constructor(private assnatApi: AssnatApiService, private searchCriteriaService: SearchCriteriaService) {}

  ngAfterViewInit() {
    this.searchCriteriaService.searchCriterias$
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchCriteria: SearchCriteria) => {
        this.searchCriteria = searchCriteria;
        this.feedPager.reset();
        if (!this.searchCriteria.isEmpty()) {
          this.feedPager.load();
        }
      });
  }

  public getSubjectSource = (pageNumber: number) => {
    return this.assnatApi.getSubjects(
      this.searchCriteria.phrase,
      this.searchCriteria.keywords,
      this.searchCriteria.deputyIds,
      this.searchCriteria.districtIds,
      this.searchCriteria.partyIds,
      this.searchCriteria.subjectTypes,
      pageNumber,
      this.pageSize,
    );
  };

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
