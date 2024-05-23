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

@Injectable({
  providedIn: 'root',
})
export class AssnatApiService {
  constructor(private httpClient: HttpClient) {}

  public getSubjectsByDeputyIds(ids: string[], pageNumber: number, pageSize: number): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(
      `${environment.apiUrl}/fil?page=${pageNumber}&taille=${pageSize}&deputeIds=${ids.join(',')}`,
    );
  }

  public getSubjects(
    phrase: string,
    keywords: string[],
    deputyIds: string[],
    districtIds: string[],
    partyIds: string[],
    pageNumber: number,
    pageSize: number,
  ): Observable<SujetReponse> {
    const request: SujetRequete = {
      phrase: phrase,
      motsCles: keywords,
      deputeIds: deputyIds,
      circonscriptionIds: districtIds,
      partiIds: partyIds,
      page: pageNumber,
      taille: pageSize,
    };
    return this.httpClient.post<SujetReponse>(`${environment.apiUrl}/sujets`, request);
  }

  public getSubjectsByIds(ids: string[]): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(`${environment.apiUrl}/sujets/${ids}`);
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
}
