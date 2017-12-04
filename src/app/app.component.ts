import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { OidcSecurityService, AuthorizationResult} from 'angular-auth-oidc-client';

import { LoggerService } from './services/log4ts/logger.service';

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  constructor(private logger: LoggerService, public oidcSecurityService: OidcSecurityService, private router: Router ) {

    // Incorrect source file name and line number :(
    this.logger.invokeConsoleMethod( 'info', 'AppComponent: logger.invokeConsoleMethod()');
    this.logger.invokeConsoleMethod( 'warn', 'AppComponent: logger.invokeConsoleMethod()');
    this.logger.invokeConsoleMethod( 'error', 'AppComponent: logger.invokeConsoleMethod()');

    // Correct source file name and line number :)
    this.logger.info('AppComponent: logger.info()');
    this.logger.warn('AppComponent: logger.warn()');
    this.logger.error('AppComponent: logger.error()');

    if (this.oidcSecurityService.moduleSetup) {
      this.onOidcModuleSetup();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.onOidcModuleSetup();
      });
    }

    this.oidcSecurityService.onAuthorizationResult.subscribe(
      (authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult);
      }
    );
  }

	ngOnInit() {
		this.logger.info("ngOnInit appComponent");
    }

    ngOnDestroy(): void {
        this.oidcSecurityService.onModuleSetup.unsubscribe();
    }

    login() {
        console.log('start login');
        this.oidcSecurityService.authorize();
    }

    refreshSession() {
        console.log('start refreshSession');
        this.oidcSecurityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.oidcSecurityService.logoff();
    }

    private onOidcModuleSetup() {
        if (window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        } else {
            if ('/autologin' !== window.location.pathname) {
                this.write('redirect', window.location.pathname);
            }
            console.log('AppComponent:onModuleSetup');
            this.oidcSecurityService.getIsAuthorized().subscribe((authorized: boolean) => {
                if (!authorized) {
                    this.router.navigate(['/autologin']);
                }
            });
        }
    }

    private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
        console.log('AppComponent:onAuthorizationResultComplete');
        const path = this.read('redirect');
        if (authorizationResult === AuthorizationResult.authorized) {
            this.router.navigate([path]);
        } else {
            this.router.navigate(['/Unauthorized']);
        }
    }

    private read(key: string): any {
        const data = localStorage.getItem(key);
        if (data != null) {
            return JSON.parse(data);
        }

        return;
    }

    private write(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
