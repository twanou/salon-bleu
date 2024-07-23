import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChildren } from '@angular/core';
import { map, Observable, of, shareReplay } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { ChipInputComponent } from 'src/app/sb-common/chip-input/chip-input.component';
import { Option } from 'src/app/sb-common/chip-input/option.interface';
import { MultiSelectComponent } from 'src/app/sb-common/multi-select/multi-select.component';
import { TemplateService } from 'src/app/sb-common/service/template-service.service';
import { SearchCriteria } from '../search-criteria-service/search-criteria.interface';
import { SearchCriteriaService } from '../search-criteria-service/search-criteria.service';

@Component({
  selector: 'sb-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  private selectedKeywords: string[] = [];
  private selectedDeputyIds: string[] = [];
  private selectedPartyIds: string[] = [];
  private selectedDistrictIds: string[] = [];
  private selectedSubjectTypes: string[] = [];
  public subjectTypes$: Observable<Option[]> = of([]);
  public currentSearchCriteria = new SearchCriteria();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  @ViewChildren(ChipInputComponent) inputs!: ChipInputComponent[];
  @ViewChildren(MultiSelectComponent) selects!: MultiSelectComponent[];

  constructor(
    private assnatApi: AssnatApiService,
    private breakpointObserver: BreakpointObserver,
    private searchCriteriaService: SearchCriteriaService,
    private templateService: TemplateService,
  ) {
    this.subjectTypes$ = this.assnatApi.getSubjectTypes().pipe(
      map((response) =>
        response.types.map((typeDescription) => ({
          id: typeDescription.type,
          value: typeDescription.description,
        })),
      ),
    );
  }

  public getDeputiesAutocompleteSource = (name: string) => {
    return this.assnatApi
      .getDeputiesByName(name)
      .pipe(
        map((response) =>
          response.deputes.map((depute) => ({ id: depute.id, value: `${depute.prenom}  ${depute.nom}` })),
        ),
      );
  };

  public getPartiesAutocompleteSource = (name: string) => {
    return this.assnatApi
      .getPartiesByName(name)
      .pipe(
        map((response) => response.partis.map((parti) => ({ id: parti.id, value: `${parti.nom}  (${parti.sigle})` }))),
      );
  };

  public getDistrictsAutocompleteSource = (name: string) => {
    return this.assnatApi
      .getDistrictsByName(name)
      .pipe(
        map((response) =>
          response.circonscriptions.map((circonscription) => ({ id: circonscription.id, value: circonscription.nom })),
        ),
      );
  };

  public onKeywordChange(keywords: string[]) {
    this.selectedKeywords = keywords;
    this.setSearchCriterias();
  }

  public onDeputyChange(deputyIds: string[]) {
    this.selectedDeputyIds = deputyIds;
    this.setSearchCriterias();
  }

  public onDistrictChange(districtIds: string[]) {
    this.selectedDistrictIds = districtIds;
    this.setSearchCriterias();
  }

  public onPartyChange(partyIds: string[]) {
    this.selectedPartyIds = partyIds;
    this.setSearchCriterias();
  }

  public onSubjectTypeChange(subjectTypes: string[]) {
    this.selectedSubjectTypes = subjectTypes;
    this.setSearchCriterias();
  }

  public reset(): void {
    this.inputs.forEach((i) => i.reset());
    this.selects.forEach((i) => i.reset());
    this.selectedKeywords = [];
    this.selectedDeputyIds = [];
    this.selectedPartyIds = [];
    this.selectedDistrictIds = [];
    this.selectedSubjectTypes = [];
    this.setSearchCriterias();
  }

  public closeSidenav(): void {
    this.templateService.closeSidenav();
  }

  private setSearchCriterias() {
    const phrase = this.isPhrase(this.selectedKeywords) ? this.selectedKeywords[0] : '';
    const keywords = this.isPhrase(this.selectedKeywords) ? [] : this.selectedKeywords;
    this.currentSearchCriteria = new SearchCriteria(
      phrase,
      keywords,
      this.selectedDeputyIds,
      this.selectedPartyIds,
      this.selectedDistrictIds,
      this.selectedSubjectTypes,
    );
    this.searchCriteriaService.setSearchCriterias(this.currentSearchCriteria);
  }

  private isPhrase(keywords: string[]): boolean {
    return keywords.length === 1 && keywords[0].indexOf(' ') > 0;
  }
}
