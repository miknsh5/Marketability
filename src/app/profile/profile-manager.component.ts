import { Component, OnInit } from '@angular/core';
import {
    AuthService, PersonProfile, Skill, Profile,
    Experience, CompanyInfo, ProfilePage, MarketabilityService
} from '../shared/index';
import {AUTH_CONFIG} from '../shared/services/auth/auth.config';

declare var Auth0Lock: any;

@Component({
    selector: 'mkb-profile-manager',
    templateUrl: './profile-manager.component.html',
    styleUrls: ['./profile-manager.component.css']
})

export class ProfileManagerComponent implements OnInit {

    currentPage: ProfilePage;
    currentProfile: PersonProfile;
    score: string;
    pageTitle: string;
    navButtonText: string;
    lock: any;
    // progressPercent:string;
    // currentProgress:number;

    constructor(private authService: AuthService, private marketabilityService: MarketabilityService) {
        this.currentPage = ProfilePage.Profile;
        this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain);
        // this.currentProgress=25;
        // this.progressPercent="25%";
    }

    ngOnInit() {
        this.getProfile();
        console.log(JSON.stringify(this.currentProfile));
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
            this.pageTitle = 'Skills';
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

    public getProfile() {
        // Fetch profile information
        const userProfile = new PersonProfile();
        const accessToken = localStorage.getItem('accessToken');
        this.lock.getUserInfo(accessToken, (error, profile) => {
            if (error) {
                // Handle error
                throw new Error(error);
            }

            userProfile.Profile = new Profile();
            userProfile.Skills = new Array<Skill>();
            userProfile.Experience = new Experience();
            userProfile.Experience.WorkExperience = new Array<CompanyInfo>();

            userProfile.Profile.Name = profile.name;
            userProfile.Profile.City = profile.location.name;
            userProfile.Profile.Occupation = profile.headline;

            ['C#', 'Java', 'JavaScript', 'Python','Ruby On Rails'].forEach(elm => {
                const skill = new Skill();
                skill.SkillName = elm;
                userProfile.Skills.push(skill);
            });

            profile.positions.values.forEach(experience => {
                const companyInfo = new CompanyInfo();
                companyInfo.CompanyName = experience.company.name;
                companyInfo.Title = experience.title;
                companyInfo.StartDate = experience.startDate.month + ' / ' + experience.startDate.year;

                if (!experience.isCurrent) {
                    companyInfo.EndDate = experience.endDate.month + ' / ' + experience.endDate.year;
                } else {
                    companyInfo.EndDate = '';
                }
                userProfile.Experience.WorkExperience.push(companyInfo);
                userProfile.Experience.WorkExperience.push(companyInfo);
                userProfile.Experience.WorkExperience.push(companyInfo);
                userProfile.Experience.WorkExperience.push(companyInfo);

            });
            this.currentProfile =  userProfile;
        });
        
    }

}
