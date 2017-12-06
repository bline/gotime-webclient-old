
export interface EnvType {
  production: boolean;
  isDebugMode: boolean;
  auth: AuthConfigType;
}
export interface ConnectionScopes {
  [key: string]: string[];
}

export interface AuthConfigType {
  clientID: string;
  domain: string;
  redirectUri: string;
  audience: string;
  connectionScopes: ConnectionScopes;
}
