import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeputyFeedComponent } from './feed/deputy-feed/deputy-feed.component';

const routes: Routes = [{ path: 'fil', component: DeputyFeedComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
