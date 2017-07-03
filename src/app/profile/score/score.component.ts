import { Component, Input } from '@angular/core';

@Component({
    selector: 'mkb-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent {
    @Input() score;
    constructor() {

    }
}
