import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { SelectedDeputyService } from '../selected-deputy.service';
import { AffectationsReponse } from 'src/app/api/assnat/models/compositions-reponse.interface';
import { Affectation } from 'src/app/api/assnat/models/composition.interface';

@Component({
  selector: 'sb-deputy-list',
  templateUrl: './deputy-list.component.html',
  styleUrls: ['./deputy-list.component.scss'],
})
export class DeputyListComponent implements OnInit {
  public assignments: Affectation[] = [];

  constructor(private assnatApi: AssnatApiService, private selectedDeputyService: SelectedDeputyService) {}

  ngOnInit() {
    this.assnatApi.getAssignments().subscribe({
      next: (response: AffectationsReponse) => {
        this.assignments = response.affectations;
      },
      error: () => {},
    });
  }

  onChange(options: MatListOption[]) {
    this.selectedDeputyService.setDeputies(options.map((o) => o.value));
  }
}
