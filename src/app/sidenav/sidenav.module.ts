import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiModule } from '../api/api.module';
import { SbCommonModule } from '../sb-common/sb-common.module';
import { DeputyListComponent } from './deputy-list/deputy-list.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SidenavTabGroupComponent } from './sidenav-tab-group/sidenav-tab-group.component';

@NgModule({
  declarations: [SidenavTabGroupComponent, DeputyListComponent, SearchFormComponent],
  imports: [
    CommonModule,
    MatListModule,
    ApiModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    SbCommonModule,
    MatTabsModule,
  ],
  exports: [SidenavTabGroupComponent],
})
export class SidenavModule {}
