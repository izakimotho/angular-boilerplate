import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, 
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { AlertService } from '../../../../@core/services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthenticationService);
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef);


  pokemonAppearAudio!: HTMLAudioElement;
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.minLength(4)]);
  password = new FormControl('', {
    validators: [Validators.required],
    updateOn: 'change',
  });
  confirmPassword = new FormControl('', {
    validators: [Validators.required],
    updateOn: 'change',
  });
  terms = new FormControl(null, [Validators.requiredTrue]);
  registerForm = this.formBuilder.group({
    name: this.name,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    terms: this.terms,
  });
  isButtonRegisterLoading = false;
  registrationCompleted = false;
  confirmPasswordHelpText = '';

  ngOnInit() {
    merge(this.password.valueChanges, this.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.checkPasswords();
      });
 
  }

  checkPasswords() {
    const areValuesEqual = this.password.value === this.confirmPassword.value;
    if (areValuesEqual && this.confirmPassword.getRawValue()) {
      this.confirmPasswordHelpText = '';
      this.confirmPassword.setErrors(null);
    } else {
      if (this.confirmPassword.touched) {
        this.confirmPasswordHelpText = 'Passwords do not match.';
      }
      this.confirmPassword.setErrors({ mismatch: true });
    }
  }

  sendForm() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.isButtonRegisterLoading = true;
      const formValue = this.registerForm.getRawValue();
      this.authService
        .register({
          email: formValue.email!,
          password: formValue.password!,
          name: formValue.name!, 
          terms: formValue.terms!,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.isButtonRegisterLoading = false;
            this.registrationCompleted = true;
            this.changeDetectorRef.markForCheck();
          },
          error: () => {
            this.isButtonRegisterLoading = false;
            this.alertService.createErrorAlert(`Register failed. This attempt wasn’t very effective, try again!`);
            this.changeDetectorRef.markForCheck();
          },
        });
    }
  }

  
}
