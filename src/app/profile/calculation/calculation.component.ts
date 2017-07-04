import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ProfilePage } from '../../index';

@Component({
    selector: 'mkb-calculation',
    templateUrl: './calculation.component.html',
    styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements AfterViewInit {

    @Output() currentPage = new EventEmitter<ProfilePage>();

    constructor() {

    }
    ngAfterViewInit() {
        this.currentPage.emit(ProfilePage.Computation);
    }
}
