import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  onLog() {
    if(this.loginForm.invalid) {
      return;
    }

    const name = this.loginForm.value?.name;
    const passsword = this.loginForm.value?.password;
    this.authService.loginUser(name, passsword).subscribe(
      (res: any) => {
        let username = name;

        this._snackBar.open(`${username} ${res?.message}`, 'Close', {
          duration: 5000,
          panelClass: ['snackbar-success']
        })
        this.loginForm.reset()
        this.router.navigate(['/home'])
      },
      (err) => [
        this._snackBar.open(err.error?.error, 'Close', {
          duration: 5000,
          panelClass: ['snackbar-success']
        })
      ]
    );
  }
}
