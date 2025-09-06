import { SearchCriteria } from './../../models/seach-criteria';
import { Component, inject } from '@angular/core';
import { LoadingOverlayComponent } from '../common/loader/loader.component';
import { Dialog } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { SimModel } from '../../models/sim-model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumber } from 'primeng/inputnumber';
import { Branch } from '../../models/branch';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { SimService } from './sim.service';
import { BranchService } from '../branches/branch-service';
import { Status } from '../../models/status.enum';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-sim-component',
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
    InputNumber,
    CommonModule,
  ],
  templateUrl: './sim-component.component.html',
  styleUrl: './sim-component.component.scss',
  providers: [ConfirmationService],
})
export class SimComponent {
  branches$!: Observable<Branch[]>;
  serachBranches$!: Observable<Branch[]>;

  isLoading: boolean = false;
  sims$!: Observable<SimModel[]>;
  visible: boolean = false;
  form!: FormGroup;
  searchCriteria: SearchCriteria = {};

  private MessageService = inject(MessageService);
  private simService = inject(SimService);
  private branchService = inject(BranchService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.form = new FormGroup({
      phoneNumber: new FormControl('', Validators.required),
      branch: new FormControl(null, Validators.required),
      totalBalance: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      dailyBalance: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      monthlyBalance: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
    });

    this.searchCriteria.admin = true;


    const branch = this.authService.userBranch;
    if (branch) {
      this.searchCriteria.branchId = branch.id;
      this.branches$ = this.branchService.getBranches(this.searchCriteria);
      this.sims$ = this.simService.search(this.searchCriteria);
    } else {
      console.log("outside");
      this.branches$ = this.branchService.getBranches({}, 0, 100);
      this.sims$ = this.simService.search(this.searchCriteria);
    }

    this.serachBranches$ = this.branches$;
  }

  showDialog() {
    this.visible = true;
  }

  addSim() {
    this.isLoading = true;
    if (this.form.valid) {
      const sim: SimModel = this.form.value;
      sim.status = Status.ACTIVE;
      this.simService.add(sim).subscribe((res) => {
        this.MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Sim added successfully',
        });
        this.search();
        this.isLoading = false;
        this.visible = false;
      });
    }
  }

  search() {
    this.sims$ = this.simService.search(this.searchCriteria)
  }

  deleteSim(_t32: any) {
    throw new Error('Method not implemented.');
  }
}
