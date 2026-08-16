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

  // loginUser() {
  //   this._auth.loginUser(this.loginUserData.email, this.loginUserData.password).subscribe(data => {
  //     console.log(data);
  //     this.loggedIn = data.loggedIn;

  //     this.loggedIn ?
  //     (
  //       this.router.navigateByUrl('/welcome'), 
  //       this._auth.loginUpdate(data.loggedIn, data.user), 
  //       this.isDataInvalid = false
  //     ) : (
  //       alert("Please enter a correct ID and Password."),
  //       this.router.navigateByUrl('/login'),
  //       this.isDataInvalid = true
  //     );
  //   });
  // }

  loginUser() {
    this._auth.loginUser(this.loginUserData.email, this.loginUserData.password).subscribe(n => {
        console.log("Server Antwort:", n);

        // Prüfung: Existiert 'n' und hat es die Eigenschaft 'loggedIn'?
        if (n && typeof n.loggedIn !== 'undefined') {
            this.loggedIn = n.loggedIn;

            if (this.loggedIn) {
                this.router.navigateByUrl("/welcome");
                this._auth.loginUpdate(n.loggedIn, n.user);
                this.isDataInvalid = false;
            } else {
                alert("Please enter a correct ID and Password.");
                this.router.navigateByUrl("/login");
                this.isDataInvalid = true;
            }
        } else {
            // Falls der Server null oder ein leeres Objekt schickt
            console.error("Ungültige Antwort vom Server");
            this.isDataInvalid = true;
            alert("Login fehlgeschlagen: Server antwortet nicht korrekt.");
        }
    }, error => {
        // Falls die API einen 401, 404 oder 500 Fehler wirft
        console.error("HTTP Fehler:", error);
        alert("Verbindung zum Server fehlgeschlagen.");
    });
}

}
