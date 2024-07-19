import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { Option } from '../chip-input/option.interface';

@Component({
  selector: 'sb-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent {
  @Input()
  public label = '';

  @Input()
  public source$: Observable<Option[]> = of([]);

  @Output()
  public onChange = new EventEmitter<string[]>();

  inputCtrl = new FormControl('');

  onSelectChange(selectChange: MatSelectChange) {
    this.onChange.emit(selectChange.value);
  }

  public reset(): void {
    this.inputCtrl.reset();
  }
}
