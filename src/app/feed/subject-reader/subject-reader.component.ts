import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SujetReponse } from 'src/app/api/assnat/models/sujet-reponse.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';

@Component({
  selector: 'sb-subject-reader',
  templateUrl: './subject-reader.component.html',
  styleUrls: ['./subject-reader.component.scss'],
})
export class SubjectReaderComponent {
  public subjects: Sujet[] = [];
  public isLoading = false;
  constructor(private assnatApi: AssnatApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const ids = this.route.snapshot.paramMap.getAll('ids');
    this.isLoading = true;
    this.assnatApi.getSubjects(ids).subscribe({
      next: (response: SujetReponse) => {
        if (response.sujets.length === 0) {
          this.router.navigate(['fil']); //TODO rediriger vers une page d'erreur?
        }
        this.subjects = response.sujets;
      },
      error: () => {},
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
