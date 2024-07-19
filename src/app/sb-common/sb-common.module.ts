import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from './avatar/avatar.component';
import { ChipInputComponent } from './chip-input/chip-input.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { PillComponent } from './pill/pill.component';
import { SbdatePipe } from './pipes/sbdate.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    AvatarComponent,
    PageTemplateComponent,
    ErrorPageComponent,
    PillComponent,
    SbdatePipe,
    ChipInputComponent,
    MultiSelectComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    TranslateModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  exports: [
    SpinnerComponent,
    AvatarComponent,
    PageTemplateComponent,
    TranslateModule,
    ErrorPageComponent,
    PillComponent,
    SbdatePipe,
    ChipInputComponent,
    MultiSelectComponent,
  ],
})
export class SbCommonModule {}
