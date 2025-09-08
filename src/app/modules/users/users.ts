import { SearchCriteria } from './../../models/seach-criteria';
import { RegisterRequest } from './../../models/register-request';
import { Component, inject } from '@angular/core';
import { User } from '../../models/user';
import { finalize, Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Branch } from '../../models/branch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Lookup } from '../../models/lookup.model';
import { LookupsService } from '../../services/lookups-service';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { FilesHandling } from '../../services/files.service';
import { AuthService } from '../auth/auth-service';
import { BranchService } from '../branches/branch-service';
import { LoginResponse } from '../../models/login-response';
import { LocalStorage } from '../../services/local-storage';
import { UserType } from '../../models/user-type.enum';
import { UserService } from '../../services/user-service';
import { LoadingOverlayComponent } from "../common/loader/loader.component";

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    SelectModule,
    ConfirmDialogModule,
    AsyncPipe,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
    FileUploadModule,
    FormsModule,
    Dialog,
    LoadingOverlayComponent
],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  providers: [ConfirmationService],
})
export class Users {
  users$!: Observable<User[]>;
  visible: boolean = false;
  form!: FormGroup;
  isLoading: boolean = true;
  private lookupService = inject(LookupsService);
  private authService = inject(AuthService);
  private branchService = inject(BranchService);
  private userService = inject(UserService);
  private storage = inject(LocalStorage);
  types$: Observable<Lookup[]> = this.lookupService.getUserTypes();
  imageAsBase64: any;
  governorates$: Observable<Lookup[]> = this.lookupService.getGvernotaes();
  cities$!: Observable<Lookup[]>;
  profileImage: any;
  branches$!: Observable<any[]>;

  searchCriteria: SearchCriteria = {};

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      username: [''],
      password: ['', Validators.required],
      govId: ['', Validators.required],
      cityId: ['', Validators.required],
      branchCode: ['', Validators.required],
    });
    this.branches$ = this.branchService.getBranches({}, 0, 1000);
    this.search();
  }

  showDialog() {
    this.visible = true;
  }

  getCities($event: SelectChangeEvent) {
    console.log('Selected governorate:', $event.value);

    this.cities$ = this.lookupService.getCities($event.value);
  }

  onUpload($event: FileSelectEvent) {
    FilesHandling.convertToBase64($event.files[0]).then(
      (base64) => (this.imageAsBase64 = base64)
    );
  }

  addUser() {
    this.isLoading = true;
    if (this.form.valid) {
      const registerRequest: RegisterRequest = this.form.getRawValue();
      registerRequest.profileImage = this.imageAsBase64;
      const response: LoginResponse = this.storage.getItem('user');
      const userType = response?.details.userType;
      if (userType == UserType.ADMIN) {
        registerRequest.userType = UserType.BRANCH_MANAGER;
        registerRequest.role = 'ROLE_MANAGER'
      }
      if (userType == UserType.BRANCH_MANAGER) {
        registerRequest.userType = UserType.USER;
        registerRequest.role = 'ROLE_USER'
      }

      this.authService
        .register(registerRequest)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.visible = false;
          })
        )
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User Added successfully',
            });
            this.search();
          },
        });
    }
  }

 search() {
  this.isLoading = true;
  this.users$ = this.userService.listUsers(this.searchCriteria, 0, 1000).pipe(
    finalize(() => {
      this.isLoading = false;
      this.visible = false;
    })
  );
}

deleteUser(userId: number) {
  this.userService.deleteUser(userId).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User Deleted successfully',
      });
      this.search();
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete user',
      });
      console.error('Error deleting user:', err);
    }
  });

}

}
