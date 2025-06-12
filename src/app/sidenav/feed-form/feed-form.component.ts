import { Component, EventEmitter, Output } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { Option } from 'src/app/sb-common/chip-input/option.interface';
import { FeedCriteriaService } from '../feed-criteria-service/feed-criteria-service';
import { FeedCriteria } from '../feed-criteria-service/feed-criteria.interface';

@Component({
    selector: 'sb-feed-form',
    templateUrl: './feed-form.component.html',
    styleUrl: './feed-form.component.scss',
    standalone: false
})
export class FeedFormComponent {
  @Output() isLoaded = new EventEmitter<boolean>();

  private selectedDeputyIds: string[] = [];
  private selectedSubjectTypes: string[] = [];
  public subjectTypes$: Observable<Option[]> = of([]);
  public currentFeedCriteria = new FeedCriteria();
  private readonly STORAGE_NAME = 'deputes-v2';

  constructor(
    private assnatApi: AssnatApiService,
    private feedCriteriaService: FeedCriteriaService,
  ) {}

  public ngOnInit(): void {
    const storageCriteria: FeedCriteria =
      JSON.parse(localStorage.getItem(this.STORAGE_NAME) || 'null') || new FeedCriteria();
    this.selectedDeputyIds = storageCriteria.deputyIds;
    this.selectedSubjectTypes = storageCriteria.subjectTypes;
    this.setFeedCriteria();
    this.subjectTypes$ = this.assnatApi.getSubjectTypes().pipe(
      map((response) =>
        response.types.map((typeDescription) => ({
          id: typeDescription.type,
          value: typeDescription.description,
        })),
      ),
    );
  }

  public onDeputyChange(deputyIds: string[]) {
    this.selectedDeputyIds = deputyIds;
    this.setFeedCriteria();
  }

  public onSubjectTypeChange(subjectTypes: string[]) {
    this.selectedSubjectTypes = subjectTypes;
    this.setFeedCriteria();
  }

  public setFeedCriteria() {
    this.currentFeedCriteria = new FeedCriteria(this.selectedDeputyIds, this.selectedSubjectTypes);
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(this.currentFeedCriteria));
    this.feedCriteriaService.setFeedCriteria(this.currentFeedCriteria);
  }
}
