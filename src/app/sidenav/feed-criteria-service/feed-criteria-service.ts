import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedCriteria } from './feed-criteria.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedCriteriaService {
  constructor() {}

  private deputies$ = new BehaviorSubject<FeedCriteria>(new FeedCriteria());
  selectedDeputies$ = this.deputies$.asObservable();

  setFeedCriteria(feedCriteria: FeedCriteria) {
    this.deputies$.next(feedCriteria);
  }
}
