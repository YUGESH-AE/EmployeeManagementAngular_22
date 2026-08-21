import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DesignationService } from '../../service/designation-service';
import { DepartmentService } from '../../service/department-service';

import { DesignationModel } from '../../models/DesignationModel';
import { DepartmentModel } from '../../models/Department';

@Component({
  selector: 'app-designation',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './designation.html',
  styleUrl: './designation.css'
})
export class Designation implements OnInit {

  designationService = inject(DesignationService);
  departmentService = inject(DepartmentService);
  chDef = inject(ChangeDetectorRef);

  save: boolean = true;

  designations: DesignationModel[] = [];

  departments: DepartmentModel[] = [];


  // ============================
  // Form
  // ============================

  designationForm = new FormGroup({

    designationId: new FormControl(),

    designationName: new FormControl(),

    departmentId: new FormControl()

  });


  // ============================
  // Init
  // ============================

  ngOnInit(): void {

    this.loadDepartments();

    this.loadDesignations();

  }


  // ============================
  // Load Departments
  // ============================

  loadDepartments(): void {

    this.departmentService.getDepartment().subscribe({

      next: (result: DepartmentModel[]) => {

        this.departments = result;

        this.chDef.detectChanges();

      },

      error: (err: any) => {

        console.error('Error loading departments:', err);

      }

    });

  }


  // ============================
  // Load Designations
  // ============================

  loadDesignations(): void {

    this.designationService.getDesignation().subscribe({

      next: (result: DesignationModel[]) => {

        this.designations = result;

        this.chDef.detectChanges();

      },

      error: (err: any) => {

        console.error('Error loading designations:', err);

      }

    });

  }


  // ============================
  // Get Department Name
  // ============================

  getDepartmentName(departmentId: number | null): string {

    const department = this.departments.find(
      department => department.departmentId === departmentId
    );

    return department?.departmentName ?? '';

  }


  // ============================
  // Save / Update
  // ============================

  upsertDesignation(): void {

    const designation = this.designationForm.getRawValue();

    if (this.save) {

      this.designationService.postDesignation(designation)
        .subscribe({

          next: () => {

            this.resetForm();

            this.loadDesignations();
            this.chDef.detectChanges();

          },

          error: (err: any) => {

            console.error('Error saving designation:', err);

          }

        });

    } else {

      this.designationService.putDesignation(designation)
        .subscribe({

          next: () => {

            this.resetForm();

            this.loadDesignations();
            this.chDef.detectChanges();

          },

          error: (err: any) => {

            console.error('Error updating designation:', err);

          }

        });

    }

  }


  // ============================
  // Reset Form
  // ============================

  resetForm(): void {

    this.designationForm.reset();

    this.save = true;
    this.chDef.detectChanges();

  }


  // ============================
  // Edit
  // ============================

  editDesignation(designation: DesignationModel): void {

    this.save = false;

    this.designationForm.setValue({

      designationId: designation.designationId,

      designationName: designation.designationName,

      departmentId: designation.departmentId

    });

  }


  // ============================
  // Delete
  // ============================

  deleteDesignation(designationId: number): void {

    this.designationService
      .deleteDesignation(designationId)
      .subscribe({

        next: () => {

          this.loadDesignations();
          this.chDef.detectChanges();

        },

        error: (err: any) => {

          console.error('Error deleting designation:', err);

        }

      });

  }

}
