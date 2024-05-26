import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Depute } from '../api/assnat/models/depute.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedDeputyService {
  constructor() {}

  private deputies$ = new BehaviorSubject<Depute[]>([
    /* { id: '636502605c4c7c07b4fcfdf7', nom: '', prenom: '', titre: '' }*/
  ]);
  selectedDeputies$ = this.deputies$.asObservable();

  setDeputies(deputy: Depute[]) {
    this.deputies$.next(deputy);
  }
}
