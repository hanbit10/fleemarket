import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  iconLWLink: string = '';
  iconLMLink: string = '';
  signupBtnLink: string = '/signup';
  loginUserData = {
    "email": "",
    "password": ""
  }

  // value shows inputs for id && pw are correctly given or not
  isDataInvalid: boolean = false;
  loggedIn: boolean = false;

  constructor(
    private _auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {}

  loginUser() {
    this._auth.loginUser(this.loginUserData.email, this.loginUserData.password).subscribe(data => {
      console.log(data);
      this.loggedIn = data.loggedIn;

      this.loggedIn ?
      (
        this.router.navigateByUrl('/welcome'), 
        this._auth.loginUpdate(data.loggedIn, data.user), 
        this.isDataInvalid = false
      ) : (
        alert("Please enter a correct ID and Password."),
        this.router.navigateByUrl('/login'),
        this.isDataInvalid = true
      );
    });
  }

}
