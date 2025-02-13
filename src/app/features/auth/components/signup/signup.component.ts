import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
      this.signUpForm = this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.passwordMatchValidator } 
      );
  
      this.signUpForm.get('password')?.valueChanges.subscribe(() => {
        this.signUpForm.get('confirmPassword')?.updateValueAndValidity();
      });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true }; 
    }
    return null;
  }

  get passwordMismatch(): boolean {
    return this.signUpForm.hasError('passwordMismatch');
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      if (this.authService.signUp(email, password)) {
        this.router.navigate(['/signin']);
        alert('Sign-up successful! You can now log in.');
      } else {
        alert('User already exists. Try logging in.');
      }
    } else {
      this.signUpForm.markAllAsTouched();
      return;
    }
  }
}
