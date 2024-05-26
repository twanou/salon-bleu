import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeputyFeedComponent } from './feed/deputy-feed/deputy-feed.component';
import { SubjectReaderComponent } from './feed/subject-reader/subject-reader.component';

const routes: Routes = [
  { path: 'fil', component: DeputyFeedComponent },
  { path: 'sujets/:ids', component: SubjectReaderComponent },
  { path: '**', redirectTo: '/fil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
