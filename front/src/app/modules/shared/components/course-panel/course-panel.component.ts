import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-panel',
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.css']
})
export class CoursePanelComponent implements OnInit {

  texto: string = '';
  opcionSeleccionada: 'ByName' | 'byProfesor' = 'ByName';
  courses: any[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (data: any[]) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }

  buscar() {
    if (this.opcionSeleccionada === 'ByName') {
      this.courseService.getCoursesByPattern(this.texto, 'ByName').subscribe(
        (data: any[]) => {
          this.courses = data;
        },
        (error) => {
          console.error('Error al buscar cursos por nombre:', error);
        }
      );
    } else if (this.opcionSeleccionada === 'byProfesor') {
      this.courseService.getCoursesByPattern(this.texto, 'byProfesor').subscribe(
        (data: any[]) => {
          this.courses = data;
        },
        (error) => {
          console.error('Error al buscar cursos por profesor:', error);
        }
      );
    }
  }
}
