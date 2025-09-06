import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { SimModel } from '../../../models/sim-model';
import { Observable } from 'rxjs';
import { SimService } from '../../sim-component/sim.service';
import { AuthService } from '../../auth/auth-service';
import { UserType } from '../../../models/user-type.enum';
import { TransactionTypeService } from '../../../services/transaction-type.service';
import { TransactionHistory } from '../transactions-history';
import { TransactionHistoryModel } from '../../../models/transaction-history';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TransactionService } from '../transaction.service';
import { Customer } from '../../../models/customer';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Router } from '@angular/router';
// import { InputTextareaModule } from 'primeng/inputtextarea';

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
    AutoCompleteModule,
    ReactiveFormsModule,
    TableModule,
    Toast,
    IftaLabelModule
  ],
  templateUrl: './balance-transfer.component.html',
  styleUrls: ['./balance-transfer.component.scss'],
})
export class BalanceTransferComponent {
  private simService = inject(SimService);
  private authService = inject(AuthService);
  private transactionTypeService = inject(TransactionTypeService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  disabled: boolean = false;
  fromAccount: any;
  customer!: Customer;
  toAccount: any;
  accounts = [];
  amount: number = 0;
  toSuggestions: SimModel[] = [];
  fromBranchSims$!: Observable<SimModel[]>;
  private transactionService = inject(TransactionService);
  private router = inject(Router);

  sumOfCashDenomiation: number = 0;

  form!: FormGroup;

  private sims: SimModel[] = [];

  transactionsTypes$ = this.transactionTypeService.list();

  subtotal: number = 0;
  grandTotal: number = 0;
  discount: number = 0;

  cashDenominations = [
    { key: 'oneEgp', value: 1, sum: 0 },
    { key: 'fiveEgp', value: 5, sum: 0 },
    { key: 'tenEgp', value: 10, sum: 0 },
    { key: 'twentyEgp', value: 20, sum: 0 },
    { key: 'fiftyEgp', value: 50, sum: 0 },
    { key: 'oneHundredEgp', value: 100, sum: 0 },
    { key: 'twoHundredEgp', value: 200, sum: 0 },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      sim: [null, Validators.required],
      customerPhoneNumber: ['', Validators.required],
      transactionType: [null],
      amount: ['', Validators.required],
      discount: [''],
      branch: [null],
      oneEgp: [0],
      fiveEgp: [0],
      tenEgp: [0],
      twentyEgp: [0],
      fiftyEgp: [0],
      oneHundredEgp: [0],
      twoHundredEgp: [0],
      notes: [''],
    });

    this.getRegisterCustomersSims();

    if (this.authService.userType === UserType.ADMIN) {
      this.fromBranchSims$ = this.simService.search({ admin: true });
    } else {
      this.fromBranchSims$ = this.simService.search({
        branchId: this.authService.userBranch?.id,
        admin: true,
      });
    }
  }

  applyDiscount() {
    const amount = this.form.get('amount')?.value || 0;
    const discount = this.form.get('discount')?.value || 0;
    if (discount > amount) {
      this.form.get('discount')?.setValue(0);
      this.grandTotal = amount;
      this.discount = 0;
    } else {
      this.grandTotal = amount - discount;
      this.discount = discount;
    }
  }

  private getRegisterCustomersSims() {
    this.simService
      .search({ branchId: this.authService.userBranch?.id, admin: false })
      .subscribe((sims) => {
        this.toSuggestions = sims;
        this.sims = sims;
      });
  }

  search(event: AutoCompleteCompleteEvent) {
    console.log(event);

    this.toSuggestions = this.sims.filter((sim) =>
      sim.phoneNumber?.includes(event.query || '')
    );
  }

  change($event: any) {
    this.toSuggestions.filter((sim) => {
      if (sim.phoneNumber === $event) {
        this.customer = sim.customer!;
      }
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.sumOfCashDenomiation !== this.grandTotal) {
        this.messageService.add({
          severity: 'error',
          summary: 'حدث خطأ',
          detail: 'مجموع الفئات لا يساوى المجموع الكلى',
        });
        return;
      }
      const transactionHistory: TransactionHistoryModel = this.form.value;
      transactionHistory.branch = this.authService.userBranch || undefined;
      transactionHistory.customer = this.customer;
      this.transactionService.createTransaction(transactionHistory).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'تمت العملية بنجاح',
            detail: 'تم تسجيل العملية بنجاح',
          });
          this.form.reset();
          this.sumOfCashDenomiation = 0;
          this.subtotal = 0;
          this.grandTotal = 0;
          this.discount = 0;
          this.router.navigate(['/home/transactions']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'حدث خطأ',
            detail: err.error?.message || 'حدث خطأ غير متوقع',
          });
        },
      });
    }
  }

  calcSumOfCashDenomiations(t: any, arg1: number, arg2: any) {
    this.sumOfCashDenomiation = this.cashDenominations.reduce(
      (acc, note) => acc + note.sum,
      0
    );
    console.log(this.sumOfCashDenomiation);

    return arg1 * arg2;
  }
}
