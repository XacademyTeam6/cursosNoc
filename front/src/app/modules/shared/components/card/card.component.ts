import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() course: any;

  constructor(private courseService: CourseService, private toastr: ToastrService, private authService: AuthService, private router: Router) { }
   
  inscribirseAlCurso() {   
    const user = this.authService.getUser();

    if (user) {      
      const courseId = this.course.id;
      console.log(courseId)
     
      this.courseService.enrollStudent(courseId, user.id).subscribe(
        (response) => {
          console.log('Usuario inscrito exitosamente en el curso.', response);
          this.toastr.success('Usuario inscrito exitosamente en el curso.');
          this.goToMyCourses();
        },
        (error) => {
          console.error('Error al inscribir al usuario en el curso.', error);
          this.toastr.error('Error al inscribir al usuario en el curso.');
        }
      );
    } else {
      console.error('No se encontró un usuario válido en el local storage.');
      
    }
  }

  goToMyCourses(){
  this.router.navigate(['/course/my-courses']);
  }

  goToCourse(courseId: number) {
    console.log('Navigating to course with ID:', courseId);
    this.router.navigate([`./course-info/${courseId}`]);
  }

  ngOnInit(): void {
  }
}