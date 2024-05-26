import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SujetReponse } from 'src/app/api/assnat/models/sujet-reponse.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';
import { ErrorHandlerService } from 'src/app/sb-common/service/error-handler.service';

@Component({
  selector: 'sb-subject-reader',
  templateUrl: './subject-reader.component.html',
  styleUrls: ['./subject-reader.component.scss'],
})
export class SubjectReaderComponent {
  public subjects: Sujet[] = [];
  public isLoading = false;
  constructor(
    private assnatApi: AssnatApiService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    const ids = this.route.snapshot.paramMap.getAll('ids');
    this.isLoading = true;
    this.assnatApi.getSubjectsByIds(ids).subscribe({
      next: (response: SujetReponse) => {
        if (response.sujets.length === 0) {
          this.router.navigate(['fil']);
        }
        this.subjects = response.sujets;
      },
      error: (error) => {
        this.errorHandlerService.handle(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
