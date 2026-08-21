import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartmentModel } from '../../models/Department';
import { DepartmentService } from '../../service/department-service';

@Component({
  selector: 'app-department',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {

  departmentService = inject(DepartmentService);
  chDef=inject(ChangeDetectorRef);

  save: boolean = true;

  departments: DepartmentModel[] = [];

  departmentForm = new FormGroup({
    departmentId: new FormControl(),
    departmentName: new FormControl(),
    isActive: new FormControl()
  });


  ngOnInit(): void {
    this.loadDepartments();
  }


  // GET ALL DEPARTMENTS
  loadDepartments(): void {

    this.departmentService.getDepartment().subscribe({

      next: (result: DepartmentModel[]) => {

        this.departments = result;
        this.chDef.detectChanges();

      },

      error: (error) => {

        console.error('Error loading departments:', error);

      }

    });

  }


  // CREATE / UPDATE
  upsertDepartment(): void {

    const department: Partial<DepartmentModel> =
      this.departmentForm.value;

    if (this.save) {

      // CREATE
      this.departmentService.postDepartment(department).subscribe({

        next: (result: any) => {

          // alert(result.message);

          this.resetForm();

          // Reload table
          this.loadDepartments();
          this.chDef.detectChanges();

        },

        error: (error) => {

          console.error('Error creating department:', error);

        }

      });

    } else {

      // UPDATE
      this.departmentService.putDepartment(department).subscribe({

        next: (result: any) => {

          // alert(result.message);

          this.resetForm();

          // Reload table
          this.loadDepartments();
          this.chDef.detectChanges();

        },

        error: (error) => {

          console.error('Error updating department:', error);

        }

      });

    }

  }


  // RESET FORM
  resetForm(): void {

    this.departmentForm.reset();

    // Next operation should be CREATE
    this.save = true;
    this.chDef.detectChanges();

  }


  // EDIT
  editDepartment(department: DepartmentModel): void {

    this.save = false;

    this.departmentForm.setValue({

      departmentId: department.departmentId,

      departmentName: department.departmentName,

      isActive: department.isActive

    });

  }


  // DELETE
  deleteDepartment(departmentId: number): void {

    this.departmentService
      .deleteDepartment(departmentId)
      .subscribe({

        next: (result: any) => {

          // alert(result.message);

          // Reload table
          this.loadDepartments();
          this.chDef.detectChanges();

        },

        error: (error) => {

          console.error('Error deleting department:', error);

        }

      });

  }

}
