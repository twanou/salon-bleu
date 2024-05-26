import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from './avatar/avatar.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, AvatarComponent, PageTemplateComponent, ErrorPageComponent],
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, TranslateModule],
  exports: [SpinnerComponent, AvatarComponent, PageTemplateComponent, TranslateModule, ErrorPageComponent],
})
export class SbCommonModule {}
