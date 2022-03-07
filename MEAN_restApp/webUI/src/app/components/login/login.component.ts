import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logUserRes: any;
  loginUserForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private loginuserservice: AuthService, private _router: Router,private _snackBar: MatSnackBar) {
    this.loginUserForm = this.formBuilder.group({
      'email': new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void {
  }
  loginUser(){
    this.loginuserservice.loginuser(this.loginUserForm.value).subscribe((data) => {
      this.logUserRes = data
      localStorage.setItem('token',this.logUserRes.token) //setting the JWT in browser
      this._router.navigate(['items'])
    },err => {
      this._snackBar.open('Wrong credentials')
      console.error(err)
    })

  }

}
