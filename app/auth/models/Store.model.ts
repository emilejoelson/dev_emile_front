import { User } from "./User.model";

export interface Store {
  di?: number;
  name: string;
  description: string;
  email: string;
  category: string;
  location: string;
  user: User; 
}