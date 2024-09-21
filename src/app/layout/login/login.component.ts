import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormField } from '../../constant/enum';

@Component({
  selector: 'app-login',
  host: { class: 'login-app' },
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  formField = FormField;
  destroy$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loginService
      .getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        const user = users.find((user) => user.username === username);
        if (!user) {
          const userInput = {
            id: '4',
            username,
            password,
            name: 'abc',
          };
          this.loginService.saveUserInfo(userInput).subscribe();
          return;
        }
        if (user.username === username && user.password === password) {
          localStorage.setItem('token', 'true');
          this.router.navigate(['product/list']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
