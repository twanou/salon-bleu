import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { Depute } from 'src/app/api/assnat/models/depute.interface';
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

  constructor(private assnatApi: AssnatApiService, private selectedDeputyService: SelectedDeputyService) {}

  ngOnInit(): void {
    this.selectedDeputyService.selectedDeputies$
      .pipe(
        map((depute: Depute[]) => depute.map((depute: Depute) => depute.id)),
        takeUntil(this.destroy$),
      )
      .subscribe((ids: string[]) => this.updateFeed(ids));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  private updateFeed(ids: string[]) {
    this.subscription?.unsubscribe();
    this.subjects = [];
    if (ids.length > 0) {
      this.subscription = this.assnatApi.getSubjects(ids).subscribe({
        next: (response: SujetReponse) => {
          this.subjects = response.sujets;
        },
        error: () => {},
      });
    }
  }
}
