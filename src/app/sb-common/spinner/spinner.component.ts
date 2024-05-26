import { Component, Input } from '@angular/core';

@Component({
  selector: 'sb-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input()
  public isLoading = false;
}
