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
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();     

      const courseId = this.course.id;
      const course = this.courseService.getCourseById(courseId)      
      const courseName = this.course.name

      this.courseService.enrollStudent(courseId, user.userId).subscribe(
        (response) => {
          console.log('Usuario inscrito exitosamente en el curso.', response);
          this.toastr.success(`¡Felicitaciones! Te inscribiste al curso de ${courseName}`);
          this.goToMyCourses();
        },
        (error) => {
          console.error('Error al inscribir al usuario en el curso.', error);
          this.toastr.error('Error al inscribirte al curso.');
        }
      );
    } else {      
      this.router.navigate(['/login']);
    }
  }

  goToMyCourses(){
    this.router.navigate(['/course/my-courses']);
  }

  goToCourse(courseId: number) {  
    this.router.navigate([`./course-info/${courseId}`]);
  }

  ngOnInit(): void {
  }
}
