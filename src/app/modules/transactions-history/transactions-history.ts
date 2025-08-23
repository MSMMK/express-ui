import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    SelectModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './transactions-history.html',
  styleUrls: ['./transactions-history.scss'],
})
export class TransactionHistory {
  from: any;
  transactions = [
    {
      from: 'Main Wallet',
      to: 'Savings',
      amount: 150,
      date: new Date('2025-08-01'),
      notes: 'Salary',
    },
    {
      from: 'Business',
      to: 'Main Wallet',
      amount: 220,
      date: new Date('2025-08-03'),
      notes: 'Refund',
    },
  ];

  constructor(
    private confirm: ConfirmationService,
    private toast: MessageService
  ) {}

  delete(row: any) {
    this.confirm.confirm({
      message: 'Are you sure you want to delete this transaction?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.transactions = this.transactions.filter((t) => t !== row);
        this.toast.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Transaction removed',
        });
      },
    });
  }
}
