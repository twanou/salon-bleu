import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiModule } from '../api/api.module';
import { SbCommonModule } from '../sb-common/sb-common.module';
import { DeputyFeedComponent } from './deputy-feed/deputy-feed.component';
import { SubjectCardComponent } from './subject-card/subject-card.component';
import { SubjectReaderComponent } from './subject-reader/subject-reader.component';

@NgModule({
  declarations: [DeputyFeedComponent, SubjectCardComponent, SubjectReaderComponent],
  imports: [
    CommonModule,
    ApiModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    SbCommonModule,
    ClipboardModule,
  ],
  exports: [],
})
export class FeedModule {}
