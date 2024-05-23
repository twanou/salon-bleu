import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { SujetReponse } from 'src/app/api/assnat/models/sujet-reponse.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';
import { ErrorHandlerService } from 'src/app/sb-common/service/error-handler.service';
import { TemplateService } from 'src/app/sb-common/service/template-service.service';

@Component({
  selector: 'sb-feed-pager',
  templateUrl: './feed-pager.component.html',
  styleUrl: './feed-pager.component.scss',
})
export class FeedPagerComponent implements OnInit, OnDestroy {
  @Input()
  public subjectSource: (pageNumber: number) => Observable<SujetReponse> = () => of();
  @Input()
  public pageSize: number = 25;

  public subjects: Sujet[] = [];
  public isLoading = false;
  public hasMoreResults = false;
  public userLastUpdate!: string;
  public appLastUpdate!: string;
  public nextUpdates: string[] = [];
  public isInitialized = false;

  private destroy$ = new Subject<void>();
  private subscription: Subscription | null = null;
  private currentPage = 0;
  private readonly STORAGE_NAME = 'last-update-v1';

  constructor(private templateService: TemplateService, private errorHandlerService: ErrorHandlerService) {
    this.userLastUpdate = localStorage.getItem(this.STORAGE_NAME) || '3000-01-01';
  }

  ngOnInit() {}

  public load() {
    this.isLoading = true;
    this.subscription?.unsubscribe();
    this.subscription = this.subjectSource(this.currentPage++).subscribe({
      next: (response: SujetReponse) => {
        this.isInitialized = true;
        this.appLastUpdate = response.derniereMaj;
        this.nextUpdates = response.futuresMaj;
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

  public reset(): void {
    this.hasMoreResults = false;
    this.isInitialized = false;
    this.currentPage = 0;
    this.subjects = [];
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
