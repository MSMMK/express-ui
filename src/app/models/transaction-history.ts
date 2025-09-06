import { Branch } from "./branch"
import { Customer } from "./customer";
import { SimModel } from "./sim-model"
import { User } from "./user";

export interface TransactionHistoryModel {
    sim?: SimModel;
    user?: User;
    customerPhoneNumber?: string;
    transactionType?: number;
    amount?: number;
    customer?: Customer;
    discount?: number;
    branch?: Branch;
    oneEgp?: number;
    fiveEgp?: number;
    tenEgp?: number;
    twentyEgp?: number;
    fiftyEgp?: number;
    oneHundredEgp?: number;
    twoHundredEgp?: number;
    notes?: string;
    creationDate?: Date;
}
