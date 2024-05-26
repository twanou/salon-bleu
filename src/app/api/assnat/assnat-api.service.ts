import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SujetReponse } from './models/sujet-reponse.interface';
import { CompositionsReponse } from './models/compositions-reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AssnatApiService {
  constructor(private httpClient: HttpClient) {}

  public getSubjects(ids: string[]): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(`http://localhost:8080/api/sujets?deputeIds=${ids.join(',')}`);
  }

  public getCompositions(): Observable<CompositionsReponse> {
    return this.httpClient.get<CompositionsReponse>('http://localhost:8080/api/compositions');
  }
}
