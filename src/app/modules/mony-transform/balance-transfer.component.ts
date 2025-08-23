import { ChangeDetectorRef, Component, computed, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-balance-transfer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    RippleModule,
    FloatLabelModule,
    SelectModule,
  ],
  templateUrl: './balance-transfer.component.html',
  styleUrls: ['./balance-transfer.component.scss']
})
export class BalanceTransferComponent {
  fromAccount: any;
  toAccount: any;
  accounts = []
  amount: number = 0;
   cashDenominations = [
    { value: 1, count: 0 },
    { value: 5, count: 0 },
    { value: 10, count: 0 },
    { value: 20, count: 0 },
    { value: 50, count: 0 },
    { value: 100, count: 0 },
    { value: 200, count: 0 },
  ];

  subtotal: number = 0;
  grandTotal: number = 0;

  ngOnInit(): void {
    // You would fetch or calculate initial data here.
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.cashDenominations.reduce((acc, note) => acc + (note.value * note.count), 0);
    // For now, let's assume no discount is applied.
    this.grandTotal = this.subtotal;
  }

  //   denominations = [
  //   { amount: 200, quantity: 0, total: 0 },
  //   { amount: 100, quantity: 0, total: 0 },
  //   { amount: 50, quantity: 0, total: 0 },
  //   { amount: 20, quantity: 0, total: 0 },
  //   { amount: 10, quantity: 0, total: 0 },
  //   { amount: 5, quantity: 0, total: 0 },
  //   { amount: 1, quantity: 0, total: 0 }
  // ];

  // accounts = [
  //   { name: 'Account 1' },
  //   { name: 'Account 2' },
  //   { name: 'Account 3' }
  // ];

  // fromAccount: any;
  // toAccount: any;
  // amount: number = 0;
  // discount: number = 0;

  // get totalWithoutDiscount() {
  //   return this.denominations.reduce((acc, denomination) => acc + (denomination.amount * denomination.quantity), 0);
  // }

  // get totalAfterDiscount() {
  //   return this.totalWithoutDiscount - this.discount;
  // }

  // onSubmit() {
  //   alert('Transfer submitted!');
  // }
}
