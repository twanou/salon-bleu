import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SujetReponse } from 'src/app/api/assnat/models/sujet-reponse.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';
import { Vue } from 'src/app/api/assnat/models/vue.interface';
import { ErrorHandlerService } from 'src/app/sb-common/service/error-handler.service';
import { BookmarkService } from 'src/app/sidenav/bookmark.service';

@Component({
    selector: 'sb-bookmark-reader',
    templateUrl: './bookmark-reader.component.html',
    styleUrl: './bookmark-reader.component.scss',
    standalone: false
})
export class BookmarkReaderComponent implements OnInit, OnDestroy {
  public subjects: Sujet[] = [];
  public isLoading = false;
  private destroy$ = new Subject<void>();
  constructor(
    private assnatApi: AssnatApiService,
    private errorHandlerService: ErrorHandlerService,
    private bookmarkService: BookmarkService,
  ) {}

  ngOnInit(): void {
    this.bookmarkService.showBookmark$.pipe(takeUntil(this.destroy$)).subscribe((id) => {
      if (id) {
        this.isLoading = true;
        this.assnatApi.getSubjectsByIds([id], Vue.DETAILLEE).subscribe({
          next: (response: SujetReponse) => {
            this.subjects = response.sujets;
          },
          error: (error) => {
            this.errorHandlerService.handle(error);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      } else {
        this.subjects = [];
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
