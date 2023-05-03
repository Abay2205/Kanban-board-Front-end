import {Role} from "./role";

export class User {
  id: number;
  name: string;
  username: string;
  password: string;
  roles: Role[] = [];
}
