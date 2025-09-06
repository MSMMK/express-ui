import { SearchCriteria } from './../../models/seach-criteria';
import { AuthService } from './../auth/auth-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { Observable } from 'rxjs';
import { TransactionHistoryModel } from '../../models/transaction-history';
import { TransactionService } from './transaction.service';
import { User } from '../../models/user';
import { SimModel } from '../../models/sim-model';
import { Branch } from '../../models/branch';
import { UserService } from '../../services/user-service';
import { BranchService } from '../branches/branch-service';
import { SimService } from '../sim-component/sim.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-transaction-history',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    SelectModule,
    ConfirmDialogModule,
    FormsModule,
    ToastModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './transactions-history.html',
  styleUrls: ['./transactions-history.scss'],
})
export class TransactionHistory implements OnInit {
  from: any;
  transactions$!: Observable<TransactionHistoryModel[]>;
  searchCriteria: SearchCriteria = {};
  users$!: Observable<User[]>;
  sims$!: Observable<SimModel[]>;
  branchs$!: Observable<Branch[]>;

  private userService = inject(UserService);
  private branchService = inject(BranchService);
  private simService = inject(SimService);

  first = 0;
  rows = 5;

  constructor(
    private confirm: ConfirmationService,
    private toast: MessageService,
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.userType !== 'ADMIN') {
      this.searchCriteria.userId = this.authService.userDetails?.id;
    } else {
      this.searchCriteria.admin = true;
    }

    this.users$ = this.userService.listUsers({
      userId: this.searchCriteria.userId,
      admin: this.searchCriteria.admin,
    });
    this.sims$ = this.simService.search({
      userId: this.searchCriteria.userId,
      admin: this.searchCriteria.admin,
    });
    this.branchs$ = this.branchService.getBranches({
      userId: this.searchCriteria.userId,
      admin: this.searchCriteria.admin,
    });

    this.serch();
  }

  serch() {
    this.transactions$ = this.transactionService.listTransactions(
      this.searchCriteria
    );
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  delete(id: number) {
    this.confirm.confirm({
      message: 'هل انت متاكد انك تريد مسح العمليه؟',
      header: 'تاكيد المسح',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.transactionService.deleteTransaction(id).subscribe((res) => {
          this.toast.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Transaction removed',
          });
          this.serch();
        });
      },
    });
  }

  export() {
    this.transactionService.export(this.searchCriteria)
    .subscribe(res => {
       const data: Blob = new Blob([res], {
        type: 'text/xlsx',
      });
      this.toast.add({
        severity: 'success',
        summary: 'استخراج البيانات',
        detail: "تم عمل استخراج للبيانات بنجاح."
    });
    FileSaver.saveAs(data, 'transactions.xlsx');
  });
  }
}
