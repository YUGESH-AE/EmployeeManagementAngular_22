import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartmentModel} from '../models/Department';

@Injectable(
    {providedIn:'root'}
)
export class DepartmentService {

  http=inject(HttpClient);

  postDepartment(department:Partial<DepartmentModel>):Observable<DepartmentModel>{
    return this.http.post<DepartmentModel>('/api/departments/create', department);
  }

  getDepartment():Observable<DepartmentModel[]>{
    return this.http.get<DepartmentModel[]>('/api/departments');
  }

  putDepartment(department:Partial<DepartmentModel>):Observable<DepartmentModel>{
    return this.http.put<DepartmentModel>('/api/departments/' + department.departmentId, department);
  }

  deleteDepartment(departmentId:number):Observable<DepartmentModel>{
    return this.http.delete<DepartmentModel>('/api/departments/' + departmentId);
  }
}
