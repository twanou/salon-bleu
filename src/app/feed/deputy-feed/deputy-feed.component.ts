import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SelectedDeputyService } from 'src/app/sidenav/selected-deputy.service';
import { FeedPagerComponent } from '../feed-pager/feed-pager.component';

@Component({
  selector: 'sb-deputy-feed',
  templateUrl: './deputy-feed.component.html',
  styleUrls: ['./deputy-feed.component.scss'],
})
export class DeputyFeedComponent implements AfterViewInit, OnDestroy {
  public selectedDeputies: string[] = [];
  public pageSize = 25;
  private destroy$ = new Subject<void>();

  @ViewChild(FeedPagerComponent) feedPager!: FeedPagerComponent;

  constructor(private assnatApi: AssnatApiService, private selectedDeputyService: SelectedDeputyService) {}

  ngAfterViewInit() {
    this.selectedDeputyService.selectedDeputies$.pipe(takeUntil(this.destroy$)).subscribe((ids: string[]) => {
      this.selectedDeputies = ids;
      this.feedPager.reset();
      if (this.selectedDeputies.length > 0) {
        this.feedPager.load();
      }
    });
  }

  public getSubjectSource = (pageNumber: number) => {
    return this.assnatApi.getSubjectsByDeputyIds(this.selectedDeputies, pageNumber, this.pageSize);
  };

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
