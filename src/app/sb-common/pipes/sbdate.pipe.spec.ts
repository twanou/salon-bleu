import { SbdatePipe } from './sbdate.pipe';

describe('SbdatePipe', () => {
  it.each([
    /*  ['1995-10-30', '30 octobre 1995'],
    ['1995-10-31', '31 octobre 1995'],
    ['1995-11-01', '1er novembre 1995'],*/
    [['1995-11-01', '1995-11-02'], '1er, 2 novembre 1995'],
    [['1995-11-01', '1995-11-02', '1995-11-03'], '1er, 2, 3 novembre 1995'],
    [['1995-10-30', '1995-10-31', '1995-11-01', '1995-11-02', '1995-11-03'], '30, 31 octobre, 1er, 2, 3 novembre 1995'],
  ])('should format date %p as %p', (date: string[], expectedFormat: string) => {
    const datePipe = new SbdatePipe();
    const result = datePipe.transform(...date);
    expect(result).toBe(expectedFormat);
  });
});
