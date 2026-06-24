export interface User {
  _id: string;
  fullName: string;
  doB: Date;
  email: string;
  phone?: string;
  roleID?: string;
  avatarUrl?: string;
}