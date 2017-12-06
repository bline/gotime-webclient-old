///<reference path="common.ts"/>
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { EnvType } from './common';
export const Env: EnvType = {
  production: true,
  isDebugMode: false,
  auth: {
    clientID: '2b4dzaAE6l0gaAAlE3ufshMTIeJBG508',
    domain: 'shambhalamountain.auth0.com',
    redirectUri: 'https://gotime.shambhalamountain.org:8443/',
    audience: 'https://shambhalamountain.auth0.com/userinfo',
    connectionScopes: {
      'google': ['email', 'profile']
    }
  }
};
