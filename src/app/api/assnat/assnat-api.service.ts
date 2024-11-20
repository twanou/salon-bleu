import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CirconscriptionReponse } from './models/circonscription-reponse.interface';
import { AffectationsReponse } from './models/compositions-reponse.interface';
import { DeputeReponse } from './models/depute-reponse.interface';
import { PartiReponse } from './models/parti-reponse.interface';
import { SujetReponse } from './models/sujet-reponse.interface';
import { SujetRequete } from './models/sujet-requete.interface';
import { SujetTypeReponse } from './models/sujet-type-reponse.interface';
import { Vue } from './models/vue.interface';

@Injectable({
  providedIn: 'root',
})
export class AssnatApiService {
  constructor(private httpClient: HttpClient) {}

  public getSubjectsByDeputyIdsOrSubjectTypes(
    ids: string[],
    subjectTypes: string[],
    pageNumber: number,
    pageSize: number,
  ): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(
      `${environment.apiUrl}/fil?page=${pageNumber}&taille=${pageSize}&deputeIds=${ids.join(',')}&sujetTypes=${subjectTypes.join(',')}`,
    );
  }

  public getSubjects(
    phrase: string,
    keywords: string[],
    deputyIds: string[],
    districtIds: string[],
    partyIds: string[],
    subjectTypes: string[],
    pageNumber: number,
    pageSize: number,
  ): Observable<SujetReponse> {
    const request: SujetRequete = {
      phrase: phrase,
      motsCles: keywords,
      deputeIds: deputyIds,
      circonscriptionIds: districtIds,
      partiIds: partyIds,
      sujetTypes: subjectTypes,
      page: pageNumber,
      taille: pageSize,
    };
    return this.httpClient.post<SujetReponse>(`${environment.apiUrl}/sujets`, request);
  }

  public getSubjectsByIds(ids: string[], view: Vue): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(`${environment.apiUrl}/sujets/${ids}?vue=${view}`);
  }

  public getAssignments(): Observable<AffectationsReponse> {
    return this.httpClient.get<AffectationsReponse>(`${environment.apiUrl}/affectations`);
  }

  public getDeputiesByName(name: string): Observable<DeputeReponse> {
    return this.httpClient.get<DeputeReponse>(`${environment.apiUrl}/deputes?nom=${name}`);
  }

  public getPartiesByName(name: string): Observable<PartiReponse> {
    return this.httpClient.get<PartiReponse>(`${environment.apiUrl}/partis?nom=${name}`);
  }

  public getDistrictsByName(name: string): Observable<CirconscriptionReponse> {
    return this.httpClient.get<CirconscriptionReponse>(`${environment.apiUrl}/circonscriptions?nom=${name}`);
  }

  public getSubjectTypes(): Observable<SujetTypeReponse> {
    return this.httpClient.get<SujetTypeReponse>(`${environment.apiUrl}/types`);
  }
}
