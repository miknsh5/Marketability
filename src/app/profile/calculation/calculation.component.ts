
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonProfile, MarketabilityService, ProfilePage } from '../../shared/index';
import { Router } from '@angular/router';

@Component({
    selector: 'mkb-calculation',
    templateUrl: './calculation.component.html',
    styleUrls: ['./calculation.component.css']
})

export class CalculationComponent implements OnInit, OnDestroy {
    CurrentPersonProfile: PersonProfile;
    timeout:any;
    
    constructor(private marketabilityService: MarketabilityService, private router: Router) {
    }

    ngOnInit(): void {

        this.timeout=setTimeout(() => {
        let personProfile: PersonProfile = JSON.parse(localStorage.getItem('profileInfo'));
        this.CurrentPersonProfile = personProfile;
        let score = this.marketabilityService.calculateMarketability(this.CurrentPersonProfile);
        this.router.navigate(["home/score"], { queryParams: { 'score': score } });
        }, 2000);
    }

    ngOnDestroy(){
        clearTimeout(this.timeout);
    }
}
