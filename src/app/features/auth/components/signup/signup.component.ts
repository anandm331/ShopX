import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class SignupComponent {
  signUpForm: FormGroup;
  formFields = [
    { name: 'email', type: 'email', validators: [Validators.required, Validators.email] },
    { name: 'password', type: 'password', validators: [Validators.required, Validators.minLength(6)] },
    { name: 'confirmPassword', type: 'password', validators: [Validators.required] },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group(
      this.createFormControls(),
      { validators: this.passwordMatchValidator }
    );
  }

  createFormControls() {
    const controls: any = {};
    this.formFields.forEach(field => {
      controls[field.name] = new FormControl('', field.validators);
    });
    return controls;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
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
    }
  }
}
