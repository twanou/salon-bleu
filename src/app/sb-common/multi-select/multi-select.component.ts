import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { Option } from '../chip-input/option.interface';

@Component({
  selector: 'sb-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent implements OnInit {
  @Input()
  public label = '';

  @Input()
  public source$: Observable<Option[]> = of([]);

  @Input()
  public selectedIds: string[] = [];

  @Output()
  public onChange = new EventEmitter<string[]>();

  public inputCtrl!: FormControl;

  ngOnInit(): void {
    this.inputCtrl = new FormControl(this.selectedIds);
  }

  onSelectChange(selectChange: MatSelectChange): void {
    this.onChange.emit(selectChange.value);
  }

  public reset(): void {
    this.inputCtrl.reset();
  }
}
