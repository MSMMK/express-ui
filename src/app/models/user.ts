import { UserType } from './user-type.enum';
export interface User {
  id?: number;
  username?: string;
  email?: string;
  city?: LookupModel;
  governorate?: LookupModel;
  userType?: UserType;
  profileImage?: string;
  branchName?: string;
}


export interface LookupModel {
  id?: number;
  nameEn?: string;
  nameAr?: string;
  code?: string;
}
