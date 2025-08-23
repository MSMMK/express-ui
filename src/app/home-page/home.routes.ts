import { Routes } from '@angular/router';
import { BalanceTransferComponent } from '../modules/mony-transform/balance-transfer.component';
import { HomePage } from './home-page';
import { TransactionHistory } from '../modules/transactions-history/transactions-history';
import { Dashboard } from '../modules/dashboard/dashboard';
import { Branches } from '../modules/branches/branches';
import { Users } from '../modules/users/users';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'mony-transform', component: BalanceTransferComponent },
      { path: 'transactions', component: TransactionHistory },
      { path: 'branches', component: Branches },
      { path: 'users', component: Users },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
