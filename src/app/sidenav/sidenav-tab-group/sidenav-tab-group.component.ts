import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { map, Observable, of, Subject } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { Option } from 'src/app/sb-common/chip-input/option.interface';

@Component({
  selector: 'sb-sidenav-tab-group',
  templateUrl: './sidenav-tab-group.component.html',
  styleUrl: './sidenav-tab-group.component.scss',
})
export class SidenavTabGroupComponent implements OnInit, OnDestroy {
  @Output()
  public isLoaded = new EventEmitter<boolean>();

  private route: string[] = ['/fil', '/recherche', '/signets'];
  private destroy$ = new Subject<void>();
  public subjectTypes$: Observable<Option[]> = of([]);

  constructor(
    private router: Router,
    private assnatApi: AssnatApiService,
  ) {}

  ngOnInit(): void {
    this.subjectTypes$ = this.assnatApi.getSubjectTypes().pipe(
      map((response) =>
        response.types.map((typeDescription) => ({
          id: typeDescription.type,
          value: typeDescription.description,
        })),
      ),
    );
  }

  selectedTabChange(event: MatTabChangeEvent) {
    this.router.navigate([this.route[event.index]]);
  }

  getSelectedIndex() {
    return this.route.indexOf(this.router.url);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
