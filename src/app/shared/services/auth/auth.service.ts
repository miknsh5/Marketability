import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { AUTH_CONFIG } from './auth.config';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

    public lock: any;

    constructor(private router: Router) {
        this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
            container: 'auth-provider',
            languageDictionary: {
                title: '',
            },
            theme: {
                logo: false,
                // primaryColor: "#607D8B"
            },
            auth: {
                redirect: false,
            },
            allowedConnections: ['linkedin'],
            rememberLastLogin: false
        });

        this.onAuthenticated();
    }

    public isAuthenticated() {
        return tokenNotExpired('id_token');
    }

    public login() {
        localStorage.clear();
        this.lock.show({ initialScreen: 'login' });
    }

    public logout() {
        localStorage.clear();
        // Send the user back to the Login after logout
        this.router.navigateByUrl('/login');
    }

    private onAuthenticated() {
        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            this.lock.hide();
            this.router.navigateByUrl('/home');
        });
    }
}
