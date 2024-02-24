import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from './avatar/avatar.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, AvatarComponent, PageTemplateComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [SpinnerComponent, AvatarComponent, PageTemplateComponent, TranslateModule],
})
export class SbCommonModule {}
