import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AffectationsReponse } from './models/compositions-reponse.interface';
import { SujetReponse } from './models/sujet-reponse.interface';

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

  public getSubjects(ids: string[]): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(`${environment.apiUrl}/sujets/${ids}`);
  }

  public getAssignments(): Observable<AffectationsReponse> {
    return this.httpClient.get<AffectationsReponse>(`${environment.apiUrl}/affectations`);
  }
}
