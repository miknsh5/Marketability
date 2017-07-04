import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {  PersonProfile, MarketabilityService } from '../../shared/index';

@Component({
    selector: 'mkb-calculation',
    templateUrl: './calculation.component.html',
    styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit{
    @Input() CurrentPersonProfile: PersonProfile;
    @Output() onscore = new EventEmitter<string>();

    constructor(private marketabilityService: MarketabilityService) {

    }

    ngOnInit(): void {

        setTimeout(()=>{
            let score = this.marketabilityService.calculateMarketability(this.CurrentPersonProfile);
            this.onscore.emit(score);
        },2000);
    }
}
