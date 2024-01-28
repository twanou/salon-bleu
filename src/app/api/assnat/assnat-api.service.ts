import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SujetReponse } from './models/sujet-reponse.interface';
import { AffectationsReponse } from './models/compositions-reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AssnatApiService {
  constructor(private httpClient: HttpClient) {}

  public getSubjectsByDeputyIds(ids: string[]): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(`http://localhost:8080/api/sujets?deputeIds=${ids.join(',')}`);
  }

  public getSubjects(ids: string[]): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(`http://localhost:8080/api/sujets/${ids}`);
  }

  public getAssignments(): Observable<AffectationsReponse> {
    return this.httpClient.get<AffectationsReponse>('http://localhost:8080/api/affectations');
  }
}
