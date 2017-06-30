import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/index';

@Component({
    selector: 'mkb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['home']);
        } else {
            this.auth.login();
        }
    }
}
