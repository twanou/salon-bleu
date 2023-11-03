import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SujetReponse } from './models/sujet-reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AssnatApiService {
  constructor(private httpClient: HttpClient) {}

  public getSubjects(): Observable<SujetReponse> {
    return this.httpClient.get<SujetReponse>(
      'http://localhost:8080/api/sujets?deputeIds=636502605c4c7c07b4fcfdca,636502605c4c7c07b4fcfe25',
    );
  }
}
