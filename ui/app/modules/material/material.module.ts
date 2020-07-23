import {NgModule} from '@angular/core';
import {
  MAT_DATE_LOCALE,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

/*
*  Import all the available Material Modules
* */

// todo-sam: Remove unused modules

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatRippleModule,
    MatBadgeModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatButtonToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatRippleModule,
    MatBadgeModule
  ],
  providers: [{
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: {
      hasBackdrop: true
    }
  }, {
    provide: MAT_DATE_LOCALE,
    useValue: 'en'
  }, MatNativeDateModule]
})
export class MaterialModule {
}
