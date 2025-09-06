import { Branch } from './branch';
import { Status } from "./status.enum";

export interface Customer {
  id?: number;
  name?: string;
  email?: string;
  cif?: string;
  status?: Status;
  simNumbers?: string[];
  branch?: Branch;
}
