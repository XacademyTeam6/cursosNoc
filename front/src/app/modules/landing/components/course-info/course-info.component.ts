import { Component, OnInit} from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  course: any;
  courseId: number = 0;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  goToLogin() {
    this.router.navigate([`/login`]);
  }

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.courseService.getCourseById(this.courseId.toString()).subscribe(course => {
        this.course = course;
      });
    });
  }
}
