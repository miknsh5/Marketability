import { Component, Input, AfterViewInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { ProfilePage } from '../../index';

declare var $: any;

@Component({
    selector: 'mkb-basic-profile',
    templateUrl: './basic-profile.component.html',
    styleUrls: ['./basic-profile.component.css']
})
export class BasicProfileComponent implements AfterViewInit {

    @Input() profile;
    @Output() currentPage = new EventEmitter<ProfilePage>();
    constructor() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            $('#occupation_textarea').trigger('autoresize');
            this.currentPage.emit(ProfilePage.Profile);
        }, 0)
    }

}
