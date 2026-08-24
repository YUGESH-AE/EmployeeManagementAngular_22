import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartmentModel} from '../models/Department';
import {apiUrl} from '../config/api-url';

@Injectable(
    {providedIn:'root'}
)
export class DepartmentService {

  http=inject(HttpClient);

  postDepartment(department:Partial<DepartmentModel>):Observable<DepartmentModel>{
    return this.http.post<DepartmentModel>(apiUrl('/api/departments/create'), department);
  }

  getDepartment():Observable<DepartmentModel[]>{
    return this.http.get<DepartmentModel[]>(apiUrl('/api/departments'));
  }

  putDepartment(department:Partial<DepartmentModel>):Observable<DepartmentModel>{
    return this.http.put<DepartmentModel>(apiUrl('/api/departments/' + department.departmentId), department);
  }

  deleteDepartment(departmentId:number):Observable<DepartmentModel>{
    return this.http.delete<DepartmentModel>(apiUrl('/api/departments/' + departmentId));
  }
}
