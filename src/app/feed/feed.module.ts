import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeputyFeedComponent } from './deputy-feed/deputy-feed.component';
import { ApiModule } from '../api/api.module';
import { SubjectCardComponent } from './subject-card/subject-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SbCommonModule } from '../sb-common/sb-common.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [DeputyFeedComponent, SubjectCardComponent],
  imports: [CommonModule, ApiModule, MatCardModule, MatExpansionModule, MatButtonModule, MatTooltipModule, MatIconModule, SbCommonModule],
  exports: [DeputyFeedComponent],
})
export class FeedModule {}
