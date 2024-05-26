import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedDeputyService {
  constructor() {}

  private deputies$ = new BehaviorSubject<string[]>([]);
  selectedDeputies$ = this.deputies$.asObservable();

  setDeputies(deputies: string[]) {
    this.deputies$.next(deputies);
  }
}
