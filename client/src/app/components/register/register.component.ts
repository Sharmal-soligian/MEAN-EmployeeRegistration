import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.regForm = fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getRegUsers();
  }

  onReg() {
    if(this.regForm.invalid) {
      return;
    }
    this.authService.createRegister(this.regForm.value).subscribe(
      (res: any) => {
        this._snackbar.open(res?.message, 'Close', {
          duration: 5000,
          panelClass: ['snackbar-successs']
        });
        this.regForm.reset();
        this.router.navigate(['/login']);
      },
      (err) => {
        this._snackbar.open(err.error?.error, 'Close', {
          duration: 5000,
          panelClass: ['snackbar-success']
        })
      }
    )
  }

  getRegUsers() {
    this.authService.getRegisteredUsers().subscribe(
      () => {
        console.log('Registered users')
      }
    )
  }

}
