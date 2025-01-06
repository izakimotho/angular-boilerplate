import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '../../../../@core/services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../types/user.type';
 

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterModule,   NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LogInComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly alertService = inject(AlertService);

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthenticationService); 
  private readonly destroyRef = inject(DestroyRef);
 
  email = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4) 
  ]);
  password = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(6) 
  ]);
  logInForm = this.formBuilder.group({
    email: this.email,
    password: this.password,
  });
  isButtonLogInLoading = false;

  sendForm() {
    this.logInForm.markAllAsTouched();
    if (this.logInForm.valid) {
      this.isButtonLogInLoading = true;
      const formValue = this.logInForm.getRawValue();
      this.authService
        .logIn({ email: formValue.email!, password: formValue.password! })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (user: User) => {
            this.isButtonLogInLoading = false;
            console.log('User logged in:', user);
            this.changeDetectorRef.markForCheck(); 
          },
          error: (response) => {
            this.isButtonLogInLoading = false;

            let errorMessage = `Oops! Something went wrong. Please try again later or leave an issue if it persists.`;
            if (response.error.internalCode === 2002) {
              errorMessage =`Invalid credentials. Not very effective, try again!`;
            }
            this.alertService.createErrorAlert(errorMessage);
            this.changeDetectorRef.markForCheck();
          },
        });
    }
  }
}
