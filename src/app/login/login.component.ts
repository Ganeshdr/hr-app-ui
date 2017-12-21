import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  message: string;
  uname: string;
  pwd: string;
  returnUrl: string;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private activeRoute: ActivatedRoute) { };

  ngOnInit() {
    //reset login status
    this.authService.logout();

    //get return url from route parameters or default to '/'
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';

  }

  onSubmit() {
    this.authService.login(this.uname, this.pwd).subscribe(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.message = 'Login failed! Try again';
      }
    });
  }
}