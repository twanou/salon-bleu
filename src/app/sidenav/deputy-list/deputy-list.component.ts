import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { AssnatApiService } from 'src/app/api/assnat/assnat-api.service';
import { Composition } from 'src/app/api/assnat/models/composition.interface';
import { CompositionsReponse } from 'src/app/api/assnat/models/compositions-reponse.interface';
import { SelectedDeputyService } from '../selected-deputy.service';

@Component({
  selector: 'sb-deputy-list',
  templateUrl: './deputy-list.component.html',
  styleUrls: ['./deputy-list.component.scss'],
})
export class DeputyListComponent implements OnInit {
  public compositions: Composition[] = [];

  constructor(private assnatApi: AssnatApiService, private selectedDeputyService: SelectedDeputyService) {}

  ngOnInit() {
    this.assnatApi.getCompositions().subscribe({
      next: (response: CompositionsReponse) => {
        this.compositions = response.compositions;
      },
      error: () => {},
    });
  }

  onChange(options: MatListOption[]) {
    this.selectedDeputyService.setDeputies(options.map((o) => o.value));
  }
}
