import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regUserRes: any;
  registerUserForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private _router: Router ) {
    this.registerUserForm = this.formBuilder.group({
      'username': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required,Validators.minLength(3)])
    })
  }

  ngOnInit(): void {

  }
  registerUser(){
    this._auth.registeruser(this.registerUserForm.value).subscribe((data) => {
      this.regUserRes = data
      localStorage.setItem('token',this.regUserRes.token) //setting the JWT in browser
      this._router.navigate(['items'])
    },err => {
      console.error(err)
    })
  }
}
