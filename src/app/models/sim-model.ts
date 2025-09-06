import { Customer } from './customer';
import { Branch } from "./branch";
import { Lookup } from "./lookup.model";
import { Status } from "./status.enum";

export interface SimModel {
  phoneNumber?: string;
  branch?: Branch;
  dailyBalance?: number;
  monthlyBalance?: number;
  totalBalance?: number;
  status?: Status;
  customer?: Customer;
}
