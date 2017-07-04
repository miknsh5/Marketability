
import { Component, AfterViewInit, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { PersonProfile, MarketabilityService, ProfilePage } from '../../shared/index';

@Component({
    selector: 'mkb-calculation',
    templateUrl: './calculation.component.html',
    styleUrls: ['./calculation.component.css']
})

export class CalculationComponent implements OnInit, AfterViewInit {
    @Input() CurrentPersonProfile: PersonProfile;
    @Output() onscore = new EventEmitter<string>();
    @Output() currentPage = new EventEmitter<ProfilePage>();

    constructor(private marketabilityService: MarketabilityService) {

    }

    ngOnInit(): void {

        setTimeout(() => {
            let score = this.marketabilityService.calculateMarketability(this.CurrentPersonProfile);
            this.onscore.emit(score);
        }, 2000);
    }
    
    ngAfterViewInit() {
        this.currentPage.emit(ProfilePage.Computation);
    }
}
