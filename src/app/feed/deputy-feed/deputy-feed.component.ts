import { Component } from '@angular/core';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';

@Component({
  selector: 'sb-deputy-feed',
  templateUrl: './deputy-feed.component.html',
  styleUrls: ['./deputy-feed.component.scss'],
})
export class DeputyFeedComponent {
  constructor(private assnatApi: AssnatApiService) {
    this.assnatApi.getSubjects().subscribe({
      next: () => {
        alert('pouet');
      },
      error: () => {
        alert('oh no');
      },
    });
  }
}
