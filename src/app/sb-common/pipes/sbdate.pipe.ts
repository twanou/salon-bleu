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

  transform(value: Date | string): string {
    const date: Date = typeof value === 'string' ? new Date(value) : value;
    return `${this.getDate(date)} ${this.getMonth(date)} ${date.getUTCFullYear()}`;
  }

  private getDate(date: Date): string {
    return `${date.getUTCDate()}${date.getUTCDate() === 0 ? 'er' : ''}`;
  }

  private getMonth(date: Date): string {
    return `${this.months[date.getUTCMonth()]}`;
  }
}
