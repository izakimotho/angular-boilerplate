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
import { RouterModule } from '@angular/router'; 
import { NgOptimizedImage } from '@angular/common'; 
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '../../../../@core/services/alert.service';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    ReactiveFormsModule, 
    NgOptimizedImage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyAccountComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService); 
  private readonly alertService = inject(AlertService);
  private readonly destroyRef = inject(DestroyRef); 
 
  user: User | undefined; 
  pokemonImage: string | undefined;
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl(''); 
  updateUserForm = this.formBuilder.group({
    name: this.name,
    email: this.email,
  });
  isButtonUpdateUserFormLoading = false;

  ngOnInit() {
    this.email.disable();
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userService
      .getMe()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User) => {
          this.user = user;
          this.name.setValue(this.user.name);
          this.email.setValue(this.user.email);  
        },
        error: () => {
          this.alertService.createErrorAlert(`Oops! Something went wrong. Please try again later or leave an issue if it persists.`);
        },
      });
  }

 
  sendForm() {
    this.updateUserForm.markAllAsTouched();
    if (this.updateUserForm.valid) {
      this.isButtonUpdateUserFormLoading = true;
      this.updateUser();
    }
  }

  updateUser() {
    const formValue = this.updateUserForm.getRawValue();
    this.userService
      .updateUser({
        name: formValue.name!,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isButtonUpdateUserFormLoading = false;
          this.alertService.createSuccessAlert(`Account settings saved. You're all set!`);
          this.changeDetectorRef.markForCheck(); 
        },
        error: () => {
          this.isButtonUpdateUserFormLoading = false;
          this.alertService.createErrorAlert(`Oops! Something went wrong. Please try again later or leave an issue if it persists.`);
          this.changeDetectorRef.markForCheck();
        },
      });
  }
}
