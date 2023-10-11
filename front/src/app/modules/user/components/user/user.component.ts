import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private toastr: ToastrService) { }

  getRoleName(role: string): string {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'teacher':
        return 'Docente';
      case 'student':
        return 'Alumno';
      default:
        return 'No asignado';
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {        
        this.userService.getUserById(userId).subscribe((user) => {
          this.user = user;
        });
      }
    });
  }

  deleteUser() {
    if (this.user && this.user.id) {      
      this.toastr.warning('¿Estás seguro? Presione esta ventana para eliminar este usuario?', 'Confirmación', {
        closeButton: true,
        timeOut: 7000,
        extendedTimeOut: 2000,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
      }).onTap.subscribe(() => {        
        this.userService.deleteUserById(this.user.id).subscribe({
          next: () => {
            console.log('Usuario eliminado exitosamente');
            this.toastr.success('El usuario se eliminó correctamente');
            this.navigateToUserList();
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
            this.toastr.error('Error al eliminar el usuario');
          },
        });
      });
    }
  }

  redirectToEditUser(userId: number) {
    this.router.navigate([`/user/edit-user/${userId}`]);
  }

  navigateToUserList(){
    this.router.navigate(['/user/user-list']);
  }
}

