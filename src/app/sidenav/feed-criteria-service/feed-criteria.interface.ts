export class FeedCriteria {
  constructor(
    public deputyIds: string[] = [],
    public subjectTypes: string[] = [],
  ) {}

  isEmpty(): boolean {
    return this.deputyIds.length === 0 && this.subjectTypes.length === 0;
  }
}
