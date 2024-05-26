import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
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
    this.setSearchCriteria();
  }

  public onDeputyChange(deputyIds: string[]) {
    this.selectedDeputyIds = deputyIds;
    this.setSearchCriteria();
  }

  public onDistrictChange(districtIds: string[]) {
    this.selectedDistrictIds = districtIds;
    this.setSearchCriteria();
  }

  public onPartyChange(partyIds: string[]) {
    this.selectedPartyIds = partyIds;
    this.setSearchCriteria();
  }

  private setSearchCriteria() {
    const phrase = this.isPhrase(this.selectedKeywords) ? this.selectedKeywords[0] : '';
    const keywords = this.isPhrase(this.selectedKeywords) ? [] : this.selectedKeywords;
    this.searchCriteriaService.setSearchCriterias(
      new SearchCriteria(phrase, keywords, this.selectedDeputyIds, this.selectedPartyIds, this.selectedDistrictIds),
    );
  }

  private isPhrase(keywords: string[]): boolean {
    return keywords.length === 1 && keywords[0].indexOf(' ') > 0;
  }
}
