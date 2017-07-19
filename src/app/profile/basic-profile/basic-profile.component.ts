import { Component, OnInit } from '@angular/core';
import { ProfilePage, Profile, PersonProfile } from '../../index';

declare var $: any;

@Component({
    selector: 'mkb-basic-profile',
    templateUrl: './basic-profile.component.html',
    styleUrls: ['./basic-profile.component.css']
})
export class BasicProfileComponent implements OnInit {

    profile: Profile;
    constructor() {
    }

    ngOnInit() {
        const personProfile: PersonProfile = JSON.parse(localStorage.getItem('profileInfo'));
        this.profile = personProfile.Profile;
    }

}
