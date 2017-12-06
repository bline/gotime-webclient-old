import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../services/auth/auth.service'

@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent implements OnInit, OnDestroy {

    isAuthorizedSubscription: Subscription;
    isAuthorized: boolean;

    constructor(public auth: AuthService) {
    }

    ngOnInit() {
        this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
            });
    }

    ngOnDestroy(): void {
        this.isAuthorizedSubscription.unsubscribe();
    }

    login() {
        this.auth.login();
    }

    refreshSession() {
        this.oidcSecurityService.authorize();
    }

    logout() {
        this.auth.logout();
    }
}
