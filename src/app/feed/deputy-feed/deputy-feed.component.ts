import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SujetReponse } from 'src/app/api/assnat/models/sujet-reponse.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';
import { ErrorHandlerService } from 'src/app/sb-common/service/error-handler.service';
import { TemplateService } from 'src/app/sb-common/service/template-service.service';
import { SelectedDeputyService } from 'src/app/sidenav/selected-deputy.service';

@Component({
  selector: 'sb-deputy-feed',
  templateUrl: './deputy-feed.component.html',
  styleUrls: ['./deputy-feed.component.scss'],
})
export class DeputyFeedComponent implements OnInit {
  public subjects: Sujet[] = [];
  public selectedDeputies: string[] = [];
  public isLoading = false;
  public hasMoreResults = false;
  public lastUpdate: Date;

  private destroy$ = new Subject<void>();
  private subscription: Subscription | null = null;
  private pageSize = 25;
  private currentPage = 0;
  private readonly STORAGE_NAME = 'last-update-v1';

  constructor(
    private assnatApi: AssnatApiService,
    private selectedDeputyService: SelectedDeputyService,
    private templateService: TemplateService,
    private errorHandlerService: ErrorHandlerService,
  ) {
    this.lastUpdate = new Date(localStorage.getItem(this.STORAGE_NAME) || new Date('3000-01-01'));
  }

  ngOnInit() {
    this.selectedDeputyService.selectedDeputies$.pipe(takeUntil(this.destroy$)).subscribe((ids: string[]) => {
      this.selectedDeputies = ids;
      this.currentPage = 0;
      this.subjects = [];
      if (this.selectedDeputies.length > 0) {
        this.load();
      }
    });
  }

  load() {
    this.isLoading = true;
    this.subscription?.unsubscribe();
    this.subscription = this.assnatApi
      .getSubjectsByDeputyIds(this.selectedDeputies, this.currentPage++, this.pageSize)
      .subscribe({
        next: (response: SujetReponse) => {
          localStorage.setItem(this.STORAGE_NAME, response.derniereMaj);
          this.hasMoreResults = response.sujets.length === this.pageSize;
          this.subjects.push(...response.sujets);
        },
        error: (error) => {
          this.errorHandlerService.handle(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  loadMore() {
    this.templateService.requestScrollDown();
    this.load();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
