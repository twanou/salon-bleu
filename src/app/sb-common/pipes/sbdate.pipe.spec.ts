import { SbdatePipe } from './sbdate.pipe';

describe('SbdatePipe', () => {
  it.each([
    [['1995-10-30'], '30 octobre 1995'],
    [['1995-10-31'], '31 octobre 1995'],
    [['1995-11-01'], '1er novembre 1995'],
    [['1995-11-01', '1995-11-10', '1996-11-01'], '1er, 10 novembre 1995 et 1er novembre 1996'],
    [['1995-11-01', '1995-11-02'], '1er et 2 novembre 1995'],
    [['1995-11-01', '1995-11-02', '1995-11-03'], '1er, 2 et 3 novembre 1995'],
    [
      ['1995-10-30', '1995-10-31', '1995-11-01', '1995-11-02', '1995-11-03'],
      '30, 31 octobre, 1er, 2 et 3 novembre 1995',
    ],
    [
      ['1995-10-30', '1995-10-31', '1996-11-01', '1996-11-02', '1996-11-03'],
      '30, 31 octobre 1995, 1er, 2 et 3 novembre 1996',
    ],
    [
      ['1995-10-30', '1996-10-31', '1997-11-01', '1998-11-02', '1999-11-03'],
      '30 octobre 1995, 31 octobre 1996, 1er novembre 1997, 2 novembre 1998 et 3 novembre 1999',
    ],
  ])('should format date %p as %p', (date: string[], expectedFormat: string) => {
    const datePipe = new SbdatePipe();
    const result = datePipe.transform(date);
    expect(result).toBe(expectedFormat);
  });
});
