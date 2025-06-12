import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { Affectation } from 'src/app/api/assnat/models/composition.interface';
import { AffectationsReponse } from 'src/app/api/assnat/models/compositions-reponse.interface';
import { Depute } from 'src/app/api/assnat/models/depute.interface';
import { ErrorHandlerService } from 'src/app/sb-common/service/error-handler.service';

@Component({
    selector: 'sb-deputy-list',
    templateUrl: './deputy-list.component.html',
    styleUrls: ['./deputy-list.component.scss'],
    standalone: false
})
export class DeputyListComponent implements OnInit {
  @Output() isLoaded = new EventEmitter<boolean>();
  @Output() onChange = new EventEmitter<string[]>();

  @Input() selectedDeputies: string[] = [];

  public assignments: Affectation[] = [];

  constructor(
    private assnatApi: AssnatApiService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.assnatApi.getAssignments().subscribe({
      next: (response: AffectationsReponse) => {
        this.assignments = response.affectations;
        this.isLoaded.emit(true);
      },
      error: (error) => {
        this.errorHandlerService.handle(error);
      },
    });
  }

  selectionChange(options: MatListOption[]) {
    const deputies: string[] = options.map((o) => o.value);
    this.onChange.emit(deputies);
  }

  isDeputySelected(deputyId: string) {
    return this.selectedDeputies.includes(deputyId);
  }

  formatName(deputy: Depute) {
    return `${deputy.nom}, ${deputy.prenom}`;
  }
}
