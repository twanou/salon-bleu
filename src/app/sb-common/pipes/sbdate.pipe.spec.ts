import { SbdatePipe } from './sbdate.pipe';

describe('SbdatePipe', () => {
  it.each(['1995-10-30', new Date('1995-10-30')])('should format date %p', (date: string | Date) => {
    const datePipe = new SbdatePipe();
    const result = datePipe.transform(date);
    expect(result).toBe('30 octobre 1995');
  });
});
