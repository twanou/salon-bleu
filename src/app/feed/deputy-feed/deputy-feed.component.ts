import { Component } from '@angular/core';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SujetReponse } from 'src/app/api/assnat/models/sujet-reponse.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';

@Component({
  selector: 'sb-deputy-feed',
  templateUrl: './deputy-feed.component.html',
  styleUrls: ['./deputy-feed.component.scss'],
})
export class DeputyFeedComponent {
  public subjects: Sujet[] = [];

  constructor(private assnatApi: AssnatApiService) {
    this.assnatApi.getSubjects().subscribe({
      next: (response: SujetReponse) => {
        this.subjects = response.sujets;
      },
      error: () => {},
    });
  }
}
