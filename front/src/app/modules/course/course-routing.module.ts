import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';

const routes: Routes = [
  {
    path: 'course-list',
    component: CourseListComponent,
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
  },
  {
    path: 'edit-course/:id',
    component: EditCourseComponent,
  },
  {
    path: 'my-courses',
    component: MyCoursesComponent,
  },
  {
    path: 'my-courses/:id',
    component: MyCoursesComponent,
  },
  {
    path: ':id',
    component: CourseComponent,
  },
  {
    path: '',
    redirectTo: 'course-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}