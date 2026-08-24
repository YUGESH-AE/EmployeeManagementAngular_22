import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DesignationModel} from '../models/DesignationModel';
import {Observable} from 'rxjs';
import {apiUrl} from '../config/api-url';

@Injectable(
  {providedIn: 'root'}
)
export class DesignationService {

  http = inject(HttpClient);

  postDesignation(designation: Partial<DesignationModel>): Observable<DesignationModel> {
    return this.http.post<DesignationModel>(apiUrl('/api/designations/create'), designation);
  }

  getDesignation(): Observable<DesignationModel[]> {
    return this.http.get<DesignationModel[]>(apiUrl('/api/designations'));
  }

  putDesignation(designation: Partial<DesignationModel>): Observable<DesignationModel> {
    return this.http.put<DesignationModel>(apiUrl('/api/designations/' + designation.designationId), designation);
  }

  deleteDesignation(designationId: number): Observable<DesignationModel> {
    return this.http.delete<DesignationModel>(apiUrl('/api/designations/' + designationId));
  }
}
