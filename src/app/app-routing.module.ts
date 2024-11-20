import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkReaderComponent } from './feed/bookmark-reader/bookmark-reader.component';
import { DeputyFeedComponent } from './feed/deputy-feed/deputy-feed.component';
import { SearchFeedComponent } from './feed/search-feed/search-feed.component';
import { SubjectReaderComponent } from './feed/subject-reader/subject-reader.component';
import { ErrorPageComponent } from './sb-common/error-page/error-page.component';

const routes: Routes = [
  { path: 'fil', component: DeputyFeedComponent },
  { path: 'recherche', component: SearchFeedComponent },
  { path: 'erreur', component: ErrorPageComponent },
  { path: 'sujets/:ids', component: SubjectReaderComponent },
  { path: 'signets', component: BookmarkReaderComponent },
  { path: '**', redirectTo: '/fil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
