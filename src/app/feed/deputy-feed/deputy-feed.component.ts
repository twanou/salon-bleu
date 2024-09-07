import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { FeedCriteriaService } from 'src/app/sidenav/feed-criteria-service/feed-criteria-service';
import { FeedCriteria } from 'src/app/sidenav/feed-criteria-service/feed-criteria.interface';
import { FeedPagerComponent } from '../feed-pager/feed-pager.component';

@Component({
  selector: 'sb-deputy-feed',
  templateUrl: './deputy-feed.component.html',
  styleUrls: ['./deputy-feed.component.scss'],
})
export class DeputyFeedComponent implements AfterViewInit, OnDestroy {
  public feedCriteria: FeedCriteria = new FeedCriteria();
  public pageSize = 25;
  private destroy$ = new Subject<void>();

  @ViewChild(FeedPagerComponent) feedPager!: FeedPagerComponent;

  constructor(
    private assnatApi: AssnatApiService,
    private feedCriteriaService: FeedCriteriaService,
  ) {}

  ngAfterViewInit() {
    this.feedCriteriaService.selectedDeputies$
      .pipe(takeUntil(this.destroy$))
      .subscribe((feedCriteria: FeedCriteria) => {
        this.feedCriteria = feedCriteria;
        this.feedPager.reset();
        if (!this.feedCriteria.isEmpty()) {
          this.feedPager.load();
        }
      });
  }

  public getSubjectSource = (pageNumber: number) => {
    return this.assnatApi.getSubjectsByDeputyIdsOrSubjectTypes(
      this.feedCriteria.deputyIds,
      this.feedCriteria.subjectTypes,
      pageNumber,
      this.pageSize,
    );
  };

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
