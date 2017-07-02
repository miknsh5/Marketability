import { Component, OnInit } from '@angular/core';
import { AuthService, PersonProfile, Skill, Profile, Experience, CompanyInfo, ProfilePage, MarketabilityService } from '../shared/index';

@Component({
    selector: 'mkb-profile-manager',
    templateUrl: './profile-manager.component.html',
    styleUrls: ['./profile-manager.component.css']
})
export class ProfileManagerComponent implements OnInit {

    currentPage: ProfilePage;
    currentProfile: PersonProfile;
    personProfile: PersonProfile;
    score: string;
    pageTitle: string;
    navButtonText: string;
    // progressPercent:string;
    // currentProgress:number;

    constructor(private authService: AuthService, private marketabilityService: MarketabilityService) {
        this.currentProfile = new PersonProfile();
        this.currentPage = ProfilePage.Profile;
        // this.currentProgress=25;
        // this.progressPercent="25%";
    }
    ngOnInit() {
        this.currentProfile = this.authService.getProfile();
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
    }

    onNextButtonClicked(page: ProfilePage) {
        this.currentPage = page + 1;
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        if (this.currentPage === ProfilePage.Computation) {
            this.calculateMarketability();
        }
        // this.currentProgress=this.currentProgress+25;
        // this.progressPercent=(this.currentProgress)+'%';
    }

    onPrevButtonClicked(page: ProfilePage) {
        this.currentPage = page - 1;
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        // this.currentProgress=this.currentProgress-25;
        // this.progressPercent=(this.currentProgress)+'%';
    }

    calculateMarketability() {
        this.score = this.marketabilityService.calculateMarketability(this.currentProfile);
        console.log(this.score);
    }

    onLogoutButtonClicked() {
        this.authService.logout();

    }

    setPageTitle(page: ProfilePage) {
        if (page === 0) {
            this.pageTitle = 'Profile';
        } else if (page === 1) {
            this.pageTitle = 'Skill';
        } else if (page === 2) {
            this.pageTitle = 'Experience';
        } else if (page === 3) {
            this.pageTitle = 'Computation';
        } else if (page === 4) {
            this.pageTitle = 'Marketability';
        } else {
            this.pageTitle = '';
        }
    }

    setNavButtonText(page: ProfilePage) {
        if (page >= ProfilePage.Experience) {
            this.navButtonText = 'Finish';
        } else {
            this.navButtonText = 'Next';
        }
    }

}
