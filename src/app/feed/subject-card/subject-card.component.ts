import { AfterViewInit, Component, Input, QueryList, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Affectation } from 'src/app/api/assnat/models/composition.interface';
import { Sujet } from 'src/app/api/assnat/models/sujet.interface';

@Component({
  selector: 'sb-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss'],
})
export class SubjectCardComponent implements AfterViewInit {
  @Input()
  public subject!: Sujet;

  @Input()
  public userLastUpdate = new Date('3000-01-01');

  @ViewChildren(MatExpansionPanel) panelsQueryList!: QueryList<MatExpansionPanel>;

  private appearances: Map<string, number> = new Map<string, number>();
  private moreVisible: Map<string, boolean> = new Map<string, boolean>();
  private panels: MatExpansionPanel[] = [];
  private panelStates: boolean[] = [];
  private readonly MAX_FUNCTION = 3;

  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) {}

  ngAfterViewInit() {
    this.panels = this.panelsQueryList.toArray();
  }

  openAssnatLink(url: string) {
    window.open(url, '_blank');
  }

  isFunctionVisible(index: number, deputyId: string): boolean {
    if (!this.appearances.has(deputyId)) {
      this.appearances.set(deputyId, index);
    }
    return this.appearances.get(deputyId) === index;
  }

  isMoreVisible(affectation: Affectation) {
    return affectation.fonctions.length > this.MAX_FUNCTION && !this.moreVisible.has(affectation.depute.id);
  }

  showMore(deputyId: string) {
    this.moreVisible.set(deputyId, true);
  }

  getFunctionsDisplayCount(affectation: Affectation) {
    return this.isMoreVisible(affectation) ? this.MAX_FUNCTION : affectation.fonctions.length;
  }

  getDirectLink(subjectId: string) {
    return `${window.location.origin}/sujets/${subjectId}`;
  }

  onDirectLinkCopy() {
    this.translateService.get('feed.copy-link-notification').subscribe((label) => {
      this.snackBar.open(label, undefined, {
        duration: 2000,
      });
    });
  }

  onOpen(currentIndex: number) {
    this.panelStates[currentIndex] = true;
    if (this.panels.length > 0) {
      let scrollTarget = currentIndex;
      this.panelStates[currentIndex] = true;
      for (let i = 0; i < this.panels.length; ++i) {
        if (currentIndex !== i && this.panelStates[i]) {
          this.panelStates[i] = false;
          this.panels[i].close();
          if (i < currentIndex) {
            scrollTarget = i; //Si l'élément ouvert actuellement précède le tiroir à ouvrir, on scroll vers celui-ci.
          }
          break;
        }
      }
      this.panels[scrollTarget]._body.nativeElement.parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  isNew(subjectLastUpdate: string) {
    return new Date(subjectLastUpdate).getTime() > this.userLastUpdate.getTime();
  }
}
