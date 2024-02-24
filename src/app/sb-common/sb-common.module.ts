import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvatarComponent } from './avatar/avatar.component';
import { PageTemplateComponent } from './page-template/page-template.component';

@NgModule({
  declarations: [SpinnerComponent, AvatarComponent, PageTemplateComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [SpinnerComponent, AvatarComponent, PageTemplateComponent],
})
export class SbCommonModule {}
