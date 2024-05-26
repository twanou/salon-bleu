import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeputyListComponent } from './deputy-list/deputy-list.component';
import { MatListModule } from '@angular/material/list';
import { ApiModule } from '../api/api.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DeputyListComponent],
  imports: [CommonModule, MatListModule, ApiModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule],
  exports: [DeputyListComponent],
})
export class SidenavModule {}
