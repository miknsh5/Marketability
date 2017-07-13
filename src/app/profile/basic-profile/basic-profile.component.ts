import { Component, Input, AfterViewInit, AfterContentChecked, Output, EventEmitter, OnInit } from '@angular/core';
import { ProfilePage, Profile, PersonProfile } from '../../index';

declare var $: any;

@Component({
    selector: 'mkb-basic-profile',
    templateUrl: './basic-profile.component.html',
    styleUrls: ['./basic-profile.component.css']
})
export class BasicProfileComponent implements OnInit, AfterViewInit {

    // @Input() profile;
    profile:Profile;
    @Output() currentPage = new EventEmitter<ProfilePage>();
    constructor() {
        console.log('BasicProfileComponent');
    }

    ngOnInit(){
        console.log(localStorage.getItem('profileInfo'));
        let personProfile:PersonProfile=JSON.parse(localStorage.getItem('profileInfo'));
        this.profile=personProfile.Profile;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            $('#occupation_textarea').trigger('autoresize');
            this.currentPage.emit(ProfilePage.Profile);
        }, 0)
    }

}
