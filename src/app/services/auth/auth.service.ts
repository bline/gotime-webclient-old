import {Injectable, Output} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {Env} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

// import { Auth0Lock } from 'auth0-lock';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  public Authenticated: Observable<boolean> = new Observable();

  lock = new Auth0Lock(Env.auth.clientID, Env.auth.domain, {
    theme: {
      logo: 'https://storage.googleapis.com/smc-main.appspot.com/logo.png',
      primaryColor: '#005375'
    },
    languageDictionary: {
      title: 'SMC Gotime',
      loginLabel: 'Sign In',
      signUpLabel: 'Create',
      signUpSubmitLabel: 'Create',
      emailInputPlaceholder: 'your email address',
      signUpTerms: 'I agree to the <a href=\'/terms\' target=\'_new\'>terms of service</a> and <a href=\'/privacy\' target=\'_new\'>' +
        'privacy policy</a>.'
    },
    auth: {
      responseType: 'id_token token',
      // requires_username: true,
      // usernameStyle: 'username',
      connectionScopes: Env.auth.connectionScopes,
      audience: Env.auth.audience,
      sso: true
    }
  });

  constructor() {
    this.lock.on('authenticated',  (authResult: any) => {
      console.log(authResult);
      localStorage.setItem('id_token', authResult.idToken);
      // XXX POST to server
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.Authenticated.next(true);
      });

      this.lock.hide();
    });
  }

  public watchAuth() {
    // Add callback for lock `authenticated` event
    Observable.interval(1000 * 60).
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.Authenticated.next(false);

    this.lock.logout();
  }

  public loggedIn() {
    return tokenNotExpired();
  }
}
