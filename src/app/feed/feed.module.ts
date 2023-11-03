import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeputyFeedComponent } from './deputy-feed/deputy-feed.component';
import { ApiModule } from '../api/api.module';
import { SubjectCardComponent } from './subject-card/subject-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [DeputyFeedComponent, SubjectCardComponent],
  imports: [CommonModule, ApiModule, MatCardModule, MatExpansionModule],
  exports: [DeputyFeedComponent],
})
export class FeedModule {}
