import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [SpinnerComponent, AvatarComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [SpinnerComponent, AvatarComponent],
})
export class SbCommonModule {}
