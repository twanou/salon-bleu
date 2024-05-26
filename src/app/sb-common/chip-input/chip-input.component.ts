import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Option } from './option.interface';

@Component({
  selector: 'sb-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrl: './chip-input.component.scss',
})
export class ChipInputComponent {
  @Input()
  public label = '';

  @Input()
  public placeholder = '';

  @Input()
  public autocompleteSource: (inputString: string) => Observable<Option[]> = () => of([]);

  @Input()
  public freeInput = false;

  @Output()
  public onChange = new EventEmitter<string[]>();

  inputCtrl = new FormControl('');
  options: Observable<Option[]>;
  selectedOptions: Option[] = [];

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor() {
    this.options = this.inputCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(val || '');
      }),
    );
  }

  filter(val: string): Observable<Option[]> {
    if (val.length > 0) {
      return this.autocompleteSource(val);
    } else {
      return of([]);
    }
  }

  add(event: MatChipInputEvent): void {
    if (this.freeInput && !this.selectedOptions.find((o) => o.value === event.value)) {
      const value = (event.value || '').trim();
      if (value) {
        if (value.indexOf(' ') >= 0 || this.isCurrentInputPhrase()) {
          this.reset();
        }
        this.selectedOptions.push({ id: '', value: value });
        this.emitValues();
      }
    }

    if (this.freeInput) {
      event.chipInput!.clear();
      this.inputCtrl.setValue(null);
    }
  }

  remove(option: Option): void {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
      this.emitValues();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedOptions.find((o) => o.id === event.option.value.id)) {
      this.selectedOptions.push(event.option.value);
      this.emitValues();
    }
    this.input.nativeElement.value = '';
    this.inputCtrl.setValue(null);
  }

  public reset(): void {
    this.selectedOptions = [];
  }

  private emitValues(): void {
    const valuesToEmit = this.selectedOptions.map((o) => (this.freeInput ? o.value : o.id));
    this.onChange.emit(valuesToEmit);
  }

  private isCurrentInputPhrase(): boolean {
    return this.selectedOptions.length === 1 && this.selectedOptions[0].value.indexOf(' ') > 0;
  }
}
