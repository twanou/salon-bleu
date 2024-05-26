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

  transform(value: string | string[]): string {
    let values: string[] = [];
    values = values.concat(value);
    const dateBuilder: string[] = [];
    for (let i = 0; i < values.length; ++i) {
      const currentDate = new Date(values[i]);
      const nextDate = i + 1 < values.length ? new Date(values[i + 1]) : null;
      const isNextLastDate = i === values.length - 2;

      dateBuilder.push(this.getDate(currentDate));
      if (nextDate && !this.sameMonth(currentDate, nextDate) && this.sameYear(currentDate, nextDate)) {
        dateBuilder.push(` ${this.getMonth(currentDate)}`);
      } else if (!nextDate || !this.sameYear(currentDate, nextDate)) {
        dateBuilder.push(` ${this.getMonth(currentDate)} ${this.getYear(currentDate)}`);
      }
      dateBuilder.push(this.getSeparator(nextDate, isNextLastDate));
    }
    return dateBuilder.join('');
  }

  private getDate(date: Date): string {
    return `${date.getUTCDate()}${date.getUTCDate() === 1 ? 'er' : ''}`;
  }

  private getMonth(date: Date): string {
    return `${this.months[date.getUTCMonth()]}`;
  }

  private getYear(date: Date): string {
    return `${date.getUTCFullYear()}`;
  }

  private sameMonth(dateA: Date, dateB: Date): boolean {
    return this.getMonth(dateA) === this.getMonth(dateB);
  }

  private sameYear(dateA: Date, dateB: Date): boolean {
    return this.getYear(dateA) === this.getYear(dateB);
  }

  private getSeparator(nextDate: Date | null, isNextLastDate: boolean) {
    if (isNextLastDate) {
      return ' et ';
    } else if (nextDate) {
      return ', ';
    } else {
      return '';
    }
  }
}
