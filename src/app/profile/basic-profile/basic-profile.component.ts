import { Component, Input, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'mkb-basic-profile',
    templateUrl: './basic-profile.component.html',
    styleUrls: ['./basic-profile.component.css']
})
export class BasicProfileComponent implements AfterViewInit {

    @Input() profile;
    constructor() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            $('#occupation_textarea').trigger('autoresize');
        }, 0)
        
    }
}
