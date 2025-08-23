
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { SvgLogo } from "../../commons/svg-logo/svg-logo";
import { AuthService } from '../auth-service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-auth',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        CardModule,
        RouterLink,
        SvgLogo
    ],
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .pipe(finalize(() => {this.isLoading = false; this.isSubmitted = false}))
        .subscribe(res => {
          this.authService.setUser(res);
          this.isSubmitted = false;
          this.router.navigate(['/home'])
        });
    }
  }
}
