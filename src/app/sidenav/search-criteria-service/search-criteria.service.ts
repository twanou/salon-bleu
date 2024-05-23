import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchCriteria } from './search-criteria.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchCriteriaService {
  constructor() {}

  private searchCriteriasSubject$ = new BehaviorSubject<SearchCriteria>(new SearchCriteria());
  searchCriterias$ = this.searchCriteriasSubject$.asObservable();

  setSearchCriterias(searchCriterias: SearchCriteria) {
    this.searchCriteriasSubject$.next(searchCriterias);
  }
}
