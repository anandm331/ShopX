import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
    loginForm: FormGroup;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
    
    onSubmit() {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value; 
        debugger   
        if (this.authService.signIn(email, password)) {
          const role = this.authService.getUserRole();
    
          alert(`Login successful! You are logged in as ${role}`);
    
          if (role === 'admin') {
            console.log("admin");
            this.router.navigate(['/admin']);
          } else {
            console.log("l00ogged");
            this.router.navigate(['/home']);
          }
        } else {
          alert('Invalid credentials');
        }
      }
      }
    }
    
  
  

