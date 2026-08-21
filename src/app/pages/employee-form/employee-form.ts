import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {EmployeeModel} from '../../models/EmployeeModel';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {EmployeeService} from '../../service/employee-service';
import {DepartmentService} from '../../service/department-service';
import {DesignationService} from '../../service/designation-service';
import {Router} from '@angular/router';
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
  route=inject(Router);
  save:boolean=true;
  employeeId: number | undefined;

  resetForm(){
    this.employeeForm.reset();
    this.chDef.detectChanges();
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadDesignations();

    const employee:EmployeeModel=
      history.state?.employee as EmployeeModel;

    if(employee){
      this.save=false;
      this.employeeId=employee.employeeId;

      this.employeeForm.patchValue({

        name: employee.name,
        contactNo: employee.contactNo,
        email: employee.email,
        city: employee.city,
        state: employee.state,
        pinCode: employee.pinCode,
        altContactNo: employee.altContactNo,
        address: employee.address,
        departmentId: employee.departmentId,
        designationId: employee.designationId,
        role: employee.role,
      });

    }
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
    const employee=this.employeeForm.getRawValue();
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
    const employee=this.employeeForm.getRawValue();
    this.employeeService.putEmployee(employee).subscribe({
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
}
