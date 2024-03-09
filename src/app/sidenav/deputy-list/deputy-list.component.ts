import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { Affectation } from 'src/app/api/assnat/models/composition.interface';
import { AffectationsReponse } from 'src/app/api/assnat/models/compositions-reponse.interface';
import { Depute } from 'src/app/api/assnat/models/depute.interface';
import { ErrorHandlerService } from 'src/app/sb-common/service/error-handler.service';
import { SelectedDeputyService } from '../selected-deputy.service';

@Component({
  selector: 'sb-deputy-list',
  templateUrl: './deputy-list.component.html',
  styleUrls: ['./deputy-list.component.scss'],
})
export class DeputyListComponent implements OnInit {
  @Output() isLoaded = new EventEmitter<boolean>();

  public assignments: Affectation[] = [];
  private selectedDeputies: Set<string> = new Set<string>();
  private readonly STORAGE_NAME = 'deputes-v1';

  constructor(
    private assnatApi: AssnatApiService,
    private selectedDeputyService: SelectedDeputyService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    const deputies: string[] = JSON.parse(localStorage.getItem(this.STORAGE_NAME) || '[]');
    this.selectedDeputyService.setDeputies(deputies);
    this.selectedDeputies = new Set<string>(deputies);
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

  onChange(options: MatListOption[]) {
    const deputies: string[] = options.map((o) => o.value);
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(deputies));
    this.selectedDeputyService.setDeputies(deputies);
  }

  isDeputySelected(deputyId: string) {
    return this.selectedDeputies.has(deputyId);
  }

  formatName(deputy: Depute) {
    return `${deputy.nom}, ${deputy.prenom}`;
  }
}
