import { Role } from '@/modules/users/enums/role.enum';

export interface UserFromJwt {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}
