import { Injectable } from '@angular/core';
import { PersonProfile } from '../index';

@Injectable()
export class MarketabilityService {

    calculateMarketability(personProfile: PersonProfile): string {
        // code to calculate score;
        const score = '37';
        return score;
    }
}
