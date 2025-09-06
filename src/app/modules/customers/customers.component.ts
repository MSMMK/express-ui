import { SearchCriteria } from './../../models/seach-criteria';
import { Customer } from './../../models/customer';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { LoadingOverlayComponent } from '../common/loader/loader.component';
import { Observable } from 'rxjs';
import { Branch } from '../../models/branch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { BranchService } from '../branches/branch-service';
import { CustomerService } from './customer.service';
import { Status } from '../../models/status.enum';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-customers',
  imports: [
    LoadingOverlayComponent,
    ButtonModule,
    InputText,
    Dialog,
    SelectModule,
    Toast,
    ConfirmDialog,
    TableModule,
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    TagModule,
    InputMaskModule,
    CommonModule
],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  providers: [ConfirmationService],
})
export class CustomersComponent {

  form!: FormGroup;
  isLoading: boolean = false;
  visible = false;
  branches$!: Observable<Branch[]>;
  binding: any;
  customers$!: Observable<Customer[]>;
  simNumbers: string[] = [];
  searchCriteria: SearchCriteria = {};

  private brsnchService = inject(BranchService);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

   ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      cif: new FormControl(null, Validators.required),
      branch: new FormControl(null, Validators.required),
    });

    this.branches$ = this.brsnchService.getBranches();
    this.search();

  }

search() {
    if (this.authService.userType === 'ADMIN') {
        this.customers$ = this.customerService.listCustomers(0, 'ADMIN');
    }else {
        this.customers$ = this.customerService.listCustomers(this.authService?.userBranch?.id!, 'USER');
    }
}
showDialog() {
  this.visible = true;
}

deleteCustomer(_t36: any) {
throw new Error('Method not implemented.');
}

addSim() {
  if(this.form.valid) {
    this.isLoading = true;
    const customer: Customer = this.form.value;
    customer.simNumbers = this.simNumbers;
    customer.status = Status.ACTIVE;

    this.customerService.addCustomer(customer).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer added successfully' });
        this.visible = false;
        this.isLoading = false;
        this.form.reset();
        this.simNumbers = [];
        this.search();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add customer' });
        console.error(err);
      }
    });
  }
}

addSimTag(val: HTMLInputElement) {
  this.simNumbers.push(val.value.trim());
  this.simNumbers = this.simNumbers.filter(v => v !== '');
  val.value = '';
}


}
