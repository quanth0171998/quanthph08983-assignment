import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { ClassListComponent } from './class-list/class-list.component';
import { FooterComponent } from './footer/footer.component';
import { FormClassComponent } from './form-class/form-class.component';
import { FormSchoolComponent } from './form-school/form-school.component';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { ShoolDetailComponent } from './shool-detail/shool-detail.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SchoolService } from './school.service';
import { ClassService } from './class.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SchoolListComponent
      },
      {
        path: 'school-detail/:id',
        component: ShoolDetailComponent
      },
      {
        path: 'school-edit/:id',
        component: FormSchoolComponent
      },
      {
        path: 'form-school',
        component: FormSchoolComponent
      },
      {
        path: 'class-list/:id',
        component: ClassListComponent
      },
      {
        path: 'class-list/:idSchool/class-detail/:idClass',
        component: ClassDetailComponent
      },
      {
        path: 'form-class/:idSchool',
        component: FormClassComponent
      },
      {
        path: 'class-list/:idSchool/class-edit/:idClass',
        component: FormClassComponent
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports:      [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, FormsModule,
    MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        // MatExpansionModule,
        // MatFormFieldModule,
        // MatGridListModule,
        // MatIconModule,
        // MatInputModule,
        // MatListModule,
        // MatMenuModule,
        // MatPaginatorModule,
        // MatProgressBarModule,
        // MatProgressSpinnerModule,
        // MatRadioModule,
        // MatRippleModule,
        // MatSelectModule,
        // MatSidenavModule,
        // MatSliderModule,
        // MatSlideToggleModule,
        // MatSnackBarModule,
        // MatSortModule,
        // MatTableModule,
        // MatTabsModule,
        // MatToolbarModule,
        // MatTooltipModule,
        // MatTreeModule,
        // MatNativeDateModule
        BrowserAnimationsModule,
    RouterModule.forRoot(routes)
     ],
  declarations: [ AppComponent, HelloComponent, ClassDetailComponent, ClassListComponent, FooterComponent, FormClassComponent, FormSchoolComponent, LayoutComponent, NavBarComponent, NotFoundComponent, SchoolListComponent, ShoolDetailComponent, SideNavComponent, ConfirmDialogComponent ],
  bootstrap:    [ AppComponent ],
  providers: [SchoolService, ClassService],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
