import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedDeputyService {
  constructor() {}

  private deputies$ = new ReplaySubject<string[]>();
  selectedDeputies$ = this.deputies$.asObservable();

  setDeputies(deputies: string[]) {
    this.deputies$.next(deputies);
  }
}
