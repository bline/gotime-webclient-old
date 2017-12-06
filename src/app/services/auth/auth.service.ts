import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Env } from './../../../environments/environment';

// import { Auth0Lock } from 'auth0-lock';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
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
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated',  (authResult: AuthResult) => {
      console.log(authResult);
      localStorage.setItem('id_token', authResult.idToken);
    });
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
  }
}
