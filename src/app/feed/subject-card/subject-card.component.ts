import { Component, Input } from '@angular/core';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';

@Component({
  selector: 'sb-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss'],
})
export class SubjectCardComponent {
  @Input()
  public subject!: Sujet;

  private appearances: Map<string, number> = new Map<string, number>();

  openAssnatLink(url: string) {
    window.open(url, '_blank');
  }

  isFunctionVisible(index: number, id: string): boolean {
    if (!this.appearances.has(id)) {
      this.appearances.set(id, index);
    }
    return this.appearances.get(id) === index;
  }

  getDirectLink(subjectId: string) {
    return `${window.location.origin}/sujets/${subjectId}`;
  }
}
