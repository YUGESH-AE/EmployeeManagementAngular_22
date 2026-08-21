import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeModel} from '../models/EmployeeModel';
import {Observable} from 'rxjs';

@Injectable(
  {providedIn:'root'}
)
export class EmployeeService {

  http=inject(HttpClient);

  postEmployee(employee:Partial<EmployeeModel>):Observable<EmployeeModel>{
    return this.http.post<EmployeeModel>('/api/employees/create', employee);
  }

  getEmployee():Observable<EmployeeModel[]>{
    return this.http.get<EmployeeModel[]>('/api/employees');
  }

  putEmployee(employee:Partial<EmployeeModel>):Observable<EmployeeModel>{
    return this.http.put<EmployeeModel>('/api/employees/' + employee.employeeId, employee);
  }

  deleteEmployee(employeeId:number):Observable<EmployeeModel>{
    return this.http.delete<EmployeeModel>('/api/employees/' + employeeId);
  }

}
