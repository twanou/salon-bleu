import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { map, Observable, shareReplay } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SujetReponse } from 'src/app/api/assnat/models/sujet-reponse.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';
import { Vue } from 'src/app/api/assnat/models/vue.interface';
import { ErrorHandlerService } from 'src/app/sb-common/service/error-handler.service';
import { TemplateService } from 'src/app/sb-common/service/template-service.service';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'sb-bookmarks-form',
  templateUrl: './bookmarks-form.component.html',
  styleUrl: './bookmarks-form.component.scss',
})
export class BookmarksFormComponent {
  public subjects: Sujet[] = [];
  public isHandset = false;
  public selectedSubject: string = '';
  private isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  constructor(
    private assnatApi: AssnatApiService,
    private errorHandlerService: ErrorHandlerService,
    private bookmarkService: BookmarkService,
    private breakpointObserver: BreakpointObserver,
    private templateService: TemplateService,
  ) {}

  ngOnInit() {
    this.refresh();

    this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });

    this.bookmarkService.bookmarkAdded$.subscribe((id) => {
      this.refresh();
    });

    this.bookmarkService.bookmarkRemoved$.subscribe((id) => {
      for (let i = 0; i < this.subjects.length; ++i) {
        if (this.subjects[i].id === id) {
          this.subjects.splice(i, 1);
          if (this.subjects.length > 0) {
            this.select(this.subjects[i > 0 ? i - 1 : 0].id);
          } else {
            this.select('');
          }
        }
      }
    });
  }

  selectionChange(option: MatListOption[]) {
    this.select(option[0].value);
  }

  select(subjectId: string) {
    this.selectedSubject = subjectId;
    if (this.isHandset) {
      this.templateService.closeSidenav();
    }
    this.bookmarkService.showBookmark(subjectId);
  }

  private refresh() {
    if (this.bookmarkService.getBookmarks().length > 0) {
      this.assnatApi.getSubjectsByIds(this.bookmarkService.getBookmarks(), Vue.SOMMAIRE).subscribe({
        next: (response: SujetReponse) => {
          this.subjects = response.sujets;
          if (this.subjects.length > 0) {
            this.select(this.subjects[0].id);
          }
        },
        error: (error) => {
          this.errorHandlerService.handle(error);
        },
      });
    }
  }
}
