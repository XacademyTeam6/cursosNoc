import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchCoursesComponent } from './components/search-courses/search-courses.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchNavComponent } from './components/search-nav/search-nav.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SearchCoursesComponent,
    CardComponent,
    SearchNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SearchCoursesComponent,
    SearchNavComponent,
  ]
})
export class SharedModule { }
