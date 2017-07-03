import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from './auth.config';
import { Profile, Skill, Experience, PersonProfile, CompanyInfo } from '../../index';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

    lock: any;

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

    login() {
        this.clearStorage();
        this.lock.show({ initialScreen: 'login' });
    }

    private onAuthenticated() {
        this.lock.on('authenticated', (authResult) => {

            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            this.lock.hide();
            this.router.navigateByUrl('/home');
        });
    }

    isAuthenticated() {
        return tokenNotExpired('id_token');
    }

    private clearStorage() {
        // To log out, just remove the token and profile from local storage
        localStorage.clear();
    }

    logout() {
        this.clearStorage();

        // Send the user back to the Login after logout
        this.router.navigateByUrl('/login');
    }
}
