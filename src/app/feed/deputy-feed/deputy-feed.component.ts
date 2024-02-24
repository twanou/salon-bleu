import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SujetReponse } from 'src/app/api/assnat/models/sujet-reponse.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';
import { SelectedDeputyService } from 'src/app/sidenav/selected-deputy.service';

@Component({
  selector: 'sb-deputy-feed',
  templateUrl: './deputy-feed.component.html',
  styleUrls: ['./deputy-feed.component.scss'],
})
export class DeputyFeedComponent implements OnInit {
  private destroy$ = new Subject<void>();
  private subscription: Subscription | null = null;
  public subjects: Sujet[] = [];
  public selectedDeputiesCount = 0;
  public isLoading = false;

  constructor(private assnatApi: AssnatApiService, private selectedDeputyService: SelectedDeputyService) {}

  ngOnInit(): void {
    this.selectedDeputyService.selectedDeputies$
      .pipe(
        tap((ids: string[]) => (this.selectedDeputiesCount = ids.length)),
        takeUntil(this.destroy$),
      )
      .subscribe((ids: string[]) => this.updateFeed(ids));
  }

  private updateFeed(ids: string[]) {
    this.subscription?.unsubscribe();
    this.subjects = [];
    if (ids.length > 0) {
      this.isLoading = true;
      this.subscription = this.assnatApi.getSubjectsByDeputyIds(ids).subscribe({
        next: (response: SujetReponse) => {
          this.subjects = response.sujets;
        },
        error: () => {},
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
