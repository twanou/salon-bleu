import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Depute } from '../api/assnat/models/depute.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedDeputyService {
  constructor() {}

  private deputies$ = new BehaviorSubject<Depute[]>([]);
  selectedDeputies$ = this.deputies$.asObservable();

  setDeputies(deputy: Depute[]) {
    this.deputies$.next(deputy);
  }
}
