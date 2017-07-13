import { Component } from '@angular/core';
import { ProfilePage } from '../../index';
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'mkb-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent {

    score;

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.score = params['score'];
        });
    }
}
