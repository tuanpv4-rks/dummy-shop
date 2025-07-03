import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Login } from '@features/auth/stores/auth.actions';
import { ICredentials } from '@features/auth/models/auth.model';
import { AuthService } from '@features/auth/services/auth.service';
import { Store } from '@ngxs/store';
import { ToastService } from '@shared/services/toast.service';
import { finalize } from 'rxjs';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private store = inject(Store);

  public isSubmitting = signal(false);
  public hide = signal(true);
  public loginForm = new FormGroup<LoginForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public get username(): FormControl {
    return this.loginForm.controls.username;
  }

  public get password(): FormControl {
    return this.loginForm.controls.password;
  }

  public handleSubmit(): void {
    if (this.loginForm.invalid) return;
    this.isSubmitting.set(true);
    this.loginForm.disable();
    const credentials = this.loginForm.value as ICredentials;

    this.store
      .dispatch(new Login(credentials))
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
          this.loginForm.enable();
        })
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: error => this.toastService.open(error.error.message),
      });
  }

  public clickEvent(event: MouseEvent): void {
    this.hide.update(hide => !hide);
    event.stopPropagation();
  }
}
