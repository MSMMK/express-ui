import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { finalize, map, Observable, single } from 'rxjs';
import { Branch } from '../../models/branch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../models/user';
import { BranchService } from './branch-service';
import { LoadingOverlayComponent } from '../common/loader/loader.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { LookupsService } from '../../services/lookups-service';
import { Lookup } from '../../models/lookup.model';
import { SearchCriteria } from '../../models/seach-criteria';

@Component({
  selector: 'app-branches',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    SelectModule,
    ConfirmDialogModule,
    ToastModule,
    AsyncPipe,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    Dialog,
    LoadingOverlayComponent,
  ],
  templateUrl: './branches.html',
  styleUrl: './branches.scss',
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Branches {
  private branchService = inject(BranchService);
  private lookupService = inject(LookupsService);
  searchCriteria: SearchCriteria = {};
  visible: boolean = false;
  branchesNames$!: Observable<string[]>
  form!: FormGroup;
  isLoading: boolean = true;
  branches$: Observable<Branch[]> = this.branchService.getBranches(this.searchCriteria, 0, 10).pipe(finalize(() => (this.isLoading = false)))

  governorates$: Observable<Lookup[]> = this.lookupService.getGvernotaes().pipe(finalize(() => (this.isLoading = false)))
  cities$!: Observable<Lookup[]>;
  users$!: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      governorate: [null, Validators.required],
      city: [null, Validators.required],
    });

    this.branchesNames$ = this.branches$.pipe(map((branches) => branches.map((branch) =>  branch.nameAr! )));
  }

  getCities($event: SelectChangeEvent) {
    this.cities$ = this.lookupService.getCities(($event.value as Lookup).id!);
}

  showDialog() {
    this.visible = true;
  }

  addBranch() {
    this.isLoading = true;
    if (this.form.valid) {
      this.branchService.addBranch(this.form.value).subscribe({
        next: () => {
          this.visible = false;
          this.form.reset();
          this.search();
        },
        error: (err) => {
          console.log('Error adding branch:', err);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add branch' + err.message,
          });
        },
      });
    }
  }

  search() {
    console.log('search criteria:', this.searchCriteria);
    this.isLoading = true;
    this.branches$ = this.branchService.getBranches(this.searchCriteria,0,5).pipe(finalize(() => (this.isLoading = false)))
}

  deleteBranch(branch: Branch): void {
    this.branchService.deleteBranch(branch.code!).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Branch deactivated successfully',
        });
        this.search()
      },
      error: (err) => {
        console.log('Error deactivating branch:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to deleted branch' + err.message,
        });
      },
    });
  }
}
