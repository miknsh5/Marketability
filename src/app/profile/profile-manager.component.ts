import { Component, OnInit, NgZone } from '@angular/core';
import {
    AuthService, PersonProfile, Skill, Profile,
    Experience, CompanyInfo, ProfilePage, MarketabilityService,
    Constants
} from '../shared/index';
import { AUTH_CONFIG } from '../shared/services/auth/auth.config';
import { Router } from '@angular/router';
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
    elementProgressBar: any;
    currentProgress: number;
    forwardNavigaton: Array<ProfilePage> = [ProfilePage.Profile, ProfilePage.Skill,
    ProfilePage.Experience, ProfilePage.Computation, ProfilePage.Marketability];

    prevNavigaton: Array<ProfilePage> = [ProfilePage.Profile, ProfilePage.Skill,
    ProfilePage.Experience, ProfilePage.Marketability];

    constructor(private authService: AuthService, private marketabilityService: MarketabilityService,
        private router: Router, private zone: NgZone) {
        this.currentPage = this.forwardNavigaton[0];
        this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain);
        this.currentProgress = 25;
    }

    ngOnInit() {
        this.getProfile();
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
    }

    onNextButtonClicked(page: ProfilePage) {
        const currentIndex = this.forwardNavigaton.indexOf(page);
        this.currentPage = this.forwardNavigaton[currentIndex + 1];
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        this.currentProgress = this.currentProgress + 25;
        document.getElementById('progressPercent').style.width = this.currentProgress + '%';
        this.navigateToCurrentPage(this.currentPage);
    }

    onPrevButtonClicked(page: ProfilePage) {

        const currentIndex = this.prevNavigaton.indexOf(page);
        this.currentPage = this.prevNavigaton[currentIndex - 1];
        this.setPageTitle(this.currentPage);

        if (page === ProfilePage.Marketability) {
            this.currentProgress = 75;
        } else {
            this.currentProgress = this.currentProgress - 25;
        }

        this.navigateToCurrentPage(this.currentPage);
        this.setNavButtonText(this.currentPage);
        setTimeout(() => {
            document.getElementById('progressPercent').style.width = this.currentProgress + '%';
        }, 100);
    }

    calculateMarketability(currentProfile: PersonProfile) {
        setTimeout(() => {
            const score = this.marketabilityService.calculateMarketability(currentProfile);
            this.score = score;
            this.onNextButtonClicked(ProfilePage.Computation);
        }, 2000);


    }

    onLogoutButtonClicked() {
        this.authService.logout();
    }

    setPageTitle(page: ProfilePage) {
        this.pageTitle = Constants.PageTitles.find(elm => elm.Id === page).Name;
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
            ['C#', 'Java', 'JavaScript', 'Python', 'Ruby On Rails'].forEach(elm => {
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

            });
            this.currentProfile = userProfile;
            localStorage.setItem('profileInfo', JSON.stringify(this.currentProfile));
            this.navigateToCurrentPage(this.currentPage);
        });

    }

    // onContentInitialized(page: ProfilePage) {
    //     if (document.getElementById('progressPercent')) {
    //         document.getElementById('progressPercent').style.width = this.currentProgress + '%';
    //     }

    // }

    private navigateToCurrentPage(currentPage: ProfilePage) {

        switch (currentPage) {
            case ProfilePage.Profile:
                this.router.navigate(['home/profile']);
                break;
            case ProfilePage.Skill:
                this.router.navigate(['home/skills']);
                break;
            case ProfilePage.Experience:
                this.router.navigate(['home/experience']);
                break;
            case ProfilePage.Computation:
                this.router.navigate(['home/calculation']);
                this.calculateMarketability(this.currentProfile);
                break;
            case ProfilePage.Marketability:
                this.router.navigate(['home/score'], { queryParams: { 'score': this.score } });
                break;
            default:
                this.router.navigate(['']);
                break;
        }
    }

}
