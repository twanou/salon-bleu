import { Component, ViewChildren } from '@angular/core';
import { map } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SearchCriteria } from '../search-criteria-service/search-criteria.interface';
import { SearchCriteriaService } from '../search-criteria-service/search-criteria.service';
import { ChipInputComponent } from 'src/app/sb-common/chip-input/chip-input.component';

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
  public currentSearchCriteria = new SearchCriteria();

  @ViewChildren(ChipInputComponent) inputs!: ChipInputComponent[];

  constructor(private assnatApi: AssnatApiService, private searchCriteriaService: SearchCriteriaService) {}

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

  public reset(): void {
    this.inputs.forEach((i) => i.reset());
    this.selectedKeywords = [];
    this.selectedDeputyIds = [];
    this.selectedPartyIds = [];
    this.selectedDistrictIds = [];
    this.setSearchCriterias();
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
    );
    this.searchCriteriaService.setSearchCriterias(this.currentSearchCriteria);
  }

  private isPhrase(keywords: string[]): boolean {
    return keywords.length === 1 && keywords[0].indexOf(' ') > 0;
  }
}
