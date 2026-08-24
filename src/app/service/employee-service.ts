import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeModel} from '../models/EmployeeModel';
import {Observable} from 'rxjs';
import {apiUrl} from '../config/api-url';

@Injectable(
  {providedIn:'root'}
)
export class EmployeeService {

  http=inject(HttpClient);

  postEmployee(employee:Partial<EmployeeModel>):Observable<EmployeeModel>{
    return this.http.post<EmployeeModel>(apiUrl('/api/employees/create'), employee);
  }

  getEmployee():Observable<EmployeeModel[]>{
    return this.http.get<EmployeeModel[]>(apiUrl('/api/employees'));
  }

  putEmployee(employee:Partial<EmployeeModel>):Observable<EmployeeModel>{
    return this.http.put<EmployeeModel>(apiUrl('/api/employees/' + employee.employeeId), employee);
  }

  deleteEmployee(employeeId:number):Observable<EmployeeModel>{
    return this.http.delete<EmployeeModel>(apiUrl('/api/employees/' + employeeId));
  }

}
