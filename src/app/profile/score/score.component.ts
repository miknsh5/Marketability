import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ProfilePage } from '../../index';

@Component({
    selector: 'mkb-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements AfterViewInit {

    @Input() score;
    @Output() currentPage = new EventEmitter<ProfilePage>();

    constructor() {

    }

    ngAfterViewInit() {
        this.currentPage.emit(ProfilePage.Experience);
    }
}
