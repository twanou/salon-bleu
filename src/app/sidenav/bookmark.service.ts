import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private bookmarks: Set<string> = new Set();
  private readonly STORAGE_NAME = 'bookmarks-v1';
  private readonly MAX_BOOKMARKS = 5;

  private showBookmarkSubject$ = new ReplaySubject<string>(1);
  showBookmark$ = this.showBookmarkSubject$.asObservable();

  private bookmarkAddedSubject$ = new ReplaySubject<string>(1);
  bookmarkAdded$ = this.bookmarkAddedSubject$.asObservable();

  private bookmarkRemovedSubject$ = new ReplaySubject<string>(1);
  bookmarkRemoved$ = this.bookmarkRemovedSubject$.asObservable();

  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {
    this.bookmarks = new Set(JSON.parse(localStorage.getItem(this.STORAGE_NAME) || 'null') || []);
  }

  getBookmarks(): string[] {
    return Array.from(this.bookmarks);
  }

  isBookmarked(subjectId: string) {
    return this.bookmarks.has(subjectId);
  }

  showBookmark(subjectId: string) {
    this.showBookmarkSubject$.next(subjectId);
  }

  addBookmark(subjectId: string) {
    if (this.bookmarks.size < this.MAX_BOOKMARKS) {
      this.translateService.get('bookmarks.added-notification').subscribe((label) => {
        this.snackBar.open(label, undefined, {
          duration: 2000,
        });
      });
      this.bookmarks.add(subjectId);
      this.bookmarkAddedSubject$.next(subjectId);
      localStorage.setItem(this.STORAGE_NAME, JSON.stringify(Array.from(this.bookmarks)));
    } else {
      this.translateService.get('bookmarks.max-reached-notification').subscribe((label) => {
        this.snackBar.open(label, undefined, {
          duration: 2000,
        });
      });
    }
  }

  removeBookmark(subjectId: string) {
    this.translateService.get('bookmarks.removed-notification').subscribe((label) => {
      this.snackBar.open(label, undefined, {
        duration: 2000,
      });
    });
    this.bookmarks.delete(subjectId);
    this.bookmarkRemovedSubject$.next(subjectId);
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(Array.from(this.bookmarks)));
  }
}
