import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeputyFeedComponent } from './deputy-feed/deputy-feed.component';
import { ApiModule } from '../api/api.module';

@NgModule({
  declarations: [DeputyFeedComponent],
  imports: [CommonModule, ApiModule],
  exports: [DeputyFeedComponent],
})
export class FeedModule {}
