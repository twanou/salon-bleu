import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sbdate',
  standalone: false,
})
export class SbdatePipe implements PipeTransform {
  private months: string[] = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];

  transform(value: string): string {
    const date = new Date(value);
    return `${this.getDate(date)} ${this.getMonth(date)} ${date.getUTCFullYear()}`;
  }

  private getDate(date: Date): string {
    return `${date.getUTCDate()}${date.getUTCDate() === 1 ? 'er' : ''}`;
  }

  private getMonth(date: Date): string {
    return `${this.months[date.getUTCMonth()]}`;
  }
}
