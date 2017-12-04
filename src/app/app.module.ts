import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { LoggerService } from './services/log4ts/logger.service';
import { ConsoleLoggerService } from './services/log4ts/console-logger.service';

import { AppComponent } from './app.component';
import { Configuration } from './app.constants';
import { routing } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AutoLoginComponent } from './auto-login/auto-login.component';

import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';


// new GoogleLoginProvider("33812767661-4a1p5lotkkveeodjehfpkucvmbpkmkhf.apps.googleusercontent.com")

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    AuthModule.forRoot(),
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ForbiddenComponent,
    HomeComponent,
    AutoLoginComponent,
    NavigationComponent,
    UnauthorizedComponent
  ],
  providers: [
    OidcSecurityService,
    Configuration,
    {
      provide: LoggerService,
      useClass: ConsoleLoggerService
    }
  ],
  bootstrap:    [AppComponent]
})
export class AppModule {
  constructor(public oidcSecurityService: OidcSecurityService) {

    const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
    openIDImplicitFlowConfiguration.client_id = '33812767661-4a1p5lotkkveeodjehfpkucvmbpkmkhf.apps.googleusercontent.com';
    openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
    openIDImplicitFlowConfiguration.hd_param = 'shambhalamountain.org';
    openIDImplicitFlowConfiguration.log_console_debug_active = true;
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 20;
    openIDImplicitFlowConfiguration.override_well_known_configuration = false;
    openIDImplicitFlowConfiguration.override_well_known_configuration_url = 'https://localhost:44386/wellknownconfiguration.json';
    openIDImplicitFlowConfiguration.post_login_route = '/home';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'https://gotime.shambhalamountain.org:8443/login';
    openIDImplicitFlowConfiguration.redirect_url = 'https://gotime.shambhalamountain.org:8443';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    openIDImplicitFlowConfiguration.scope = 'openid email profile';
    openIDImplicitFlowConfiguration.silent_renew_offset_in_seconds = 0;
    openIDImplicitFlowConfiguration.silent_renew = true;
    openIDImplicitFlowConfiguration.start_checksession = false;
    openIDImplicitFlowConfiguration.storage = localStorage;
    openIDImplicitFlowConfiguration.stsServer = 'https://accounts.google.com';
    openIDImplicitFlowConfiguration.trigger_authorization_result_event = true;
    openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';

    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);

    // if you need custom parameters
    // oidcSecurityService.setCustomRequestParameters({ 't4': 'ABC abc 123', 't3': 'wo' });
  }
}

