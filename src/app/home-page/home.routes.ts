import { Routes } from '@angular/router';
import { BalanceTransferComponent } from '../modules/transactions-history/mony-transfier/balance-transfer.component';
import { HomePage } from './home-page';
import { TransactionHistory } from '../modules/transactions-history/transactions-history';
import { Dashboard } from '../modules/dashboard/dashboard';
import { Branches } from '../modules/branches/branches';
import { Users } from '../modules/users/users';
import { SimComponent } from '../modules/sim-component/sim-component.component';
import { CustomersComponent } from '../modules/customers/customers.component';
import { authGuard } from '../gaurds/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'mony-transform', component: BalanceTransferComponent },
      { path: 'transactions', component: TransactionHistory },
      { path: 'branches', component: Branches },
      { path: 'users', component: Users },
      { path: 'branc-sims', component: SimComponent },
      { path: 'customers', component: CustomersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
