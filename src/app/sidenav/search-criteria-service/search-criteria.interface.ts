export class SearchCriteria {
  constructor(
    public phrase: string = '',
    public keywords: string[] = [],
    public deputyIds: string[] = [],
    public partyIds: string[] = [],
    public districtIds: string[] = [],
    public subjectTypes: string[] = [],
  ) {}

  isEmpty(): boolean {
    return (
      this.deputyIds.length === 0 &&
      this.keywords.length === 0 &&
      this.districtIds.length === 0 &&
      this.partyIds.length === 0 &&
      this.subjectTypes.length === 0 &&
      this.phrase === ''
    );
  }
}
