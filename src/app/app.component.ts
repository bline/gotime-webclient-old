import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { routing } from './app.routes';
import { LoggerService } from './services/log4ts/logger.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  constructor(private logger: LoggerService,
              private router: Router, private auth: AuthService) {

    // Incorrect source file name and line number :(
    this.logger.invokeConsoleMethod( 'info', 'AppComponent: logger.invokeConsoleMethod()');
    this.logger.invokeConsoleMethod( 'warn', 'AppComponent: logger.invokeConsoleMethod()');
    this.logger.invokeConsoleMethod( 'error', 'AppComponent: logger.invokeConsoleMethod()');

    // Correct source file name and line number :)
    this.logger.info('AppComponent: logger.info()');
    this.logger.warn('AppComponent: logger.warn()');
    this.logger.error('AppComponent: logger.error()');

    auth.handleAuth();
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
