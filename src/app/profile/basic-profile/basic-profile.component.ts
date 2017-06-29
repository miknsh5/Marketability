import { Component, Input } from '@angular/core';

@Component({
    selector: 'mkb-basic-profile',
    templateUrl: './basic-profile.component.html',
    styleUrls: ['./basic-profile.component.css']
})
export class BasicProfileComponent {

    @Input() profile;
    constructor() {

    }
}
