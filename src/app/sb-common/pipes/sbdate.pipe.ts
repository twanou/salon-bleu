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

  transform(...values: string[]): string {
    const dateBuilder: string[] = [];
    for (let i = 0; i < values.length; ++i) {
      const date = new Date(values[i]);
      const nextDate = i + 1 < values.length ? new Date(values[i + 1]) : null;
      dateBuilder.push(this.getDate(date));
      if (nextDate && this.getMonth(date) === this.getMonth(nextDate)) {
        dateBuilder.push(', ');
      } else if (nextDate) {
        dateBuilder.push(` ${this.getMonth(date)}, `);
      } else {
        dateBuilder.push(` ${this.getMonth(date)} ${date.getUTCFullYear()}`);
      }
    }
    return dateBuilder.join('');
  }

  private getDate(date: Date): string {
    return `${date.getUTCDate()}${date.getUTCDate() === 1 ? 'er' : ''}`;
  }

  private getMonth(date: Date): string {
    return `${this.months[date.getUTCMonth()]}`;
  }
}
