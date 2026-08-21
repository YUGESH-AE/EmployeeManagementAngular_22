import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {EmployeeModel} from '../../models/EmployeeModel';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {EmployeeService} from '../../service/employee-service';
import {DepartmentService} from '../../service/department-service';
import {DesignationService} from '../../service/designation-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentModel} from '../../models/Department';
import {DesignationModel} from '../../models/DesignationModel';

@Component({
  selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit{


  employees:EmployeeModel[]=[];
  departments:DepartmentModel[]=[];
  designations:DesignationModel[]=[];

  employeeForm=new FormGroup({
    employeeId:new FormControl<number | null>(null),
    name:new FormControl(),
    contactNo:new FormControl(),
    email:new FormControl(),
    city:new FormControl(),
    state:new FormControl(),
    pinCode:new FormControl(),
    altContactNo:new FormControl(),
    address:new FormControl(),
    departmentId:new FormControl(),
    designationId:new FormControl(),
    createdDate:new FormControl(new Date()),
    modifiedDate:new FormControl(new Date()),
    role:new FormControl()
  });

  employeeService=inject(EmployeeService);
  departmentService=inject(DepartmentService);
  designationService=inject(DesignationService);
  chDef=inject(ChangeDetectorRef);
  router=inject(Router);
  activatedRoute=inject(ActivatedRoute);
  save:boolean=true;
  employeeId: number | undefined;

  resetForm(){
    this.employeeForm.reset();
    this.save=true;
    this.employeeId=undefined;
    this.chDef.detectChanges();
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadDesignations();
    this.loadEmployeeForEdit();
  }

  private loadEmployeeForEdit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    const fromState = history.state?.employee as EmployeeModel | undefined;

    if (fromState?.employeeId) {
      this.applyEmployee(fromState);
      return;
    }

    if (!idParam) {
      return;
    }

    const employeeId = Number(idParam);
    this.employeeService.getEmployee().subscribe({
      next: (result: EmployeeModel[]) => {
        const employee = result.find(item => item.employeeId === employeeId);
        if (employee) {
          this.applyEmployee(employee);
        }
      },
      error: (err: unknown) => {
        console.error(err);
      }
    });
  }

  private applyEmployee(employee: EmployeeModel): void {
    this.save = false;
    this.employeeId = employee.employeeId;

    const departmentId =
      employee.departmentId ??
      this.designations.find(item => item.designationId === employee.designationId)?.departmentId ??
      null;

    this.employeeForm.patchValue({
      employeeId: employee.employeeId ?? null,
      name: employee.name,
      contactNo: employee.contactNo,
      email: employee.email,
      city: employee.city,
      state: employee.state,
      pinCode: employee.pinCode,
      altContactNo: employee.altContactNo,
      address: employee.address,
      departmentId,
      designationId: employee.designationId,
      role: employee.role,
    });
    this.chDef.detectChanges();
  }

  upsertEmployee():void{

    if(this.save){
      this.saveEmployee();
    }else {
      this.updateEmployee();
    }
  }

  loadDepartments():void{

    this.departmentService.getDepartment().subscribe({
      next:(result:any)=>{
        this.departments=result;
        this.chDef.detectChanges();
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }

  loadDesignations():void{

    this.designationService.getDesignation().subscribe({
      next:(result:any)=>{
        this.designations=result;
        if (this.employeeId) {
          const current = this.employeeForm.getRawValue();
          if (current.designationId && !current.departmentId) {
            const departmentId = this.designations.find(
              item => item.designationId === current.designationId
            )?.departmentId;
            if (departmentId != null) {
              this.employeeForm.patchValue({ departmentId });
            }
          }
        }
        this.chDef.detectChanges();
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }

  getDepartmentName(departmentId:number|null):string{
    const department=this.departments.find(department=>department.departmentId===departmentId);
    return department?.departmentName??"";
  }

  getDesignationName(designationId:number|null):string{
    const designation=this.designations.find(designation=>designation.designationId===designationId);
    return designation?.designationName??"";
  }

  saveEmployee():void{
    const {employeeId, ...employee}=this.employeeForm.getRawValue();
    this.employeeService.postEmployee(employee).subscribe({
      next:(result:any)=>{
        alert(result.message);
        this.resetForm();
        this.chDef.detectChanges();
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }
  updateEmployee():void{
    const employee={
      ...this.employeeForm.getRawValue(),
      employeeId: this.employeeId
    } as Partial<EmployeeModel>;
    this.employeeService.putEmployee(employee).subscribe({
      next:(result:any)=>{
        alert(result.message ?? 'Employee updated');
        this.router.navigateByUrl('/employees');
        this.chDef.detectChanges();
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }
}
