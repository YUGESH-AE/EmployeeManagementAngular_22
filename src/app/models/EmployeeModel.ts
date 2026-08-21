export interface EmployeeModel {
  employeeId?: number;
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pinCode: string;
  altContactNo: string;
  address: string;
  departmentId: number;
  designationId: number;
  createdDate: Date | null;
  modifiedDate: Date | null;
  role: string;
}
