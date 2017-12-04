import './styles.scss';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// is this really needed?
if (environment.production) {
  enableProdMode();
}

// Styles.
// Enables Hot Module Replacement.
declare var module: any;

if (module.hot) {
  module.hot.accept();
}

platformBrowserDynamic().bootstrapModule(AppModule);
  // .catch(err => console.log(err));
