interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '0ms9HDkS9Hv7F6PvVWewTN05zqOU0cr9',
  domain: 'marketablitytest.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
