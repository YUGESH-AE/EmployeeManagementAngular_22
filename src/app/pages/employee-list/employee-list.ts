import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {EmployeeModel} from '../../models/EmployeeModel';
import {EmployeeService} from '../../service/employee-service';
import {Router} from '@angular/router';
import {DepartmentService} from '../../service/department-service';
import {DesignationService} from '../../service/designation-service';
import {DepartmentModel} from '../../models/Department';
import {DesignationModel} from '../../models/DesignationModel';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit{
  ngOnInit(): void {
      this.getEmployees();
      this.loadDepartment();
      this.loadDesignation();
  }

  employees:EmployeeModel[]=[];
  departments:DepartmentModel[]=[];
  designations:DesignationModel[]=[];

  employeeService=inject(EmployeeService);
  departmentService=inject(DepartmentService);
  designationService=inject(DesignationService);
  chDef=inject(ChangeDetectorRef);
  router=inject(Router);


  getEmployees():void{
    this.employeeService.getEmployee().subscribe({
      next:(result:any)=>{
        this.employees=result;
        this.chDef.detectChanges();
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }

  deleteEmployee(employeeId:number):void{
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next:(result:any)=>{
        this.getEmployees();
        this.chDef.detectChanges();
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }

  editEmployee(employee:EmployeeModel):void{

    this.router.navigateByUrl("/new-employee",{state:employee});
  }

  loadDepartment():void{
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
  loadDesignation():void{
    this.designationService.getDesignation().subscribe({
      next:(result:any)=>{
        this.designations=result;
        this.chDef.detectChanges();
      },
      error:(err:any)=>{}
    })
  }
  getDepartmentName(designationId:number|null):string{
    const designation=this.designations.find(designation=>designation.designationId===designationId);
    const department=this.departments.find(department=>department.departmentId===designation?.departmentId);
    return department?.departmentName??"";
  }
  getDesignationName(designationId:number|null):string{
    const designation=this.designations.find(designation=>designation.designationId===designationId);
    return designation?.designationName??"";
  }
}
