import { Component, OnInit } from '@angular/core';
import { AuthService, PersonProfile } from '../shared/index';

@Component({
    selector: 'mkb-profile-manager',
    templateUrl: './profile-manager.component.html',
    styleUrls: ['./profile-manager.component.css']
})
export class ProfileManagerComponent implements OnInit {

    personProfile: PersonProfile;

    constructor(private authService: AuthService) {
        this.personProfile = new PersonProfile();
    }
    ngOnInit() {
        this.personProfile = this.authService.getProfile();
        console.log(this.personProfile);
    }
}
