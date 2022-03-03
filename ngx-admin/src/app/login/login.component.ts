import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthenService } from '@app/@core/services/authen.service';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

declare var FB: any;

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private authenService: AuthenService
  ) {
  }

  ngOnInit(): void {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '3121756241419989',
        cookie: true,
        xfbml: true,
        version: 'v3.1',
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.authenService.authenByProvider(data?.email).subscribe((res: any) => {
        localStorage.setItem('google_auth', JSON.stringify(data));
        localStorage.setItem('username', data?.name);
        localStorage.setItem('photoUrl', data?.photoUrl);
        localStorage.setItem('access_token', res.access_token);
        this.router.navigateByUrl('/pages/f-dashboard').then();
      });
    });
  }

  login() {
    this.authenService.login(this.formLogin.get('username').value, this.formLogin.get('password').value).subscribe((res: any) => {
      localStorage.setItem('username', this.formLogin.get('username').value);
      localStorage.setItem('access_token', res.access_token);
      this.router.navigateByUrl('/pages/f-dashboard').then();
    })
  }

  go2Dashboard(): void {
    this.router.navigateByUrl('/pages/f-dashboard').then();
  }

  signInWithFacebook(): void {
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        this.router.navigateByUrl('/pages/f-dashboard').then();
      } else {
        console.log('User login failed');
      }
    });
  }

}
