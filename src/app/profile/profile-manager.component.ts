import { Component, OnInit, NgZone } from '@angular/core';
import {
    AuthService, PersonProfile, Skill, Profile,
    Experience, CompanyInfo, ProfilePage, MarketabilityService,
    Constants
} from '../shared/index';
import { AUTH_CONFIG } from '../shared/services/auth/auth.config';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

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
        private router: Router, private zone: NgZone, private platformLocation: PlatformLocation) {
        this.currentPage = this.forwardNavigaton[0];
        this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain);
        this.currentProgress = 25;
        this.navigateToCurrentPage(this.currentPage);
    }

    ngOnInit() {
        this.getProfile();
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);

        this.platformLocation.onPopState((event) => {
            this.onLocationChanged(event['target'].location.pathname);
        });
        this.router.events.subscribe((event) => {
            if (event.constructor.name === 'NavigationEnd') {
                if (window.location.pathname === '/home/score') {
                    this.currentPage = ProfilePage.Marketability;
                    this.setPageTitle(this.currentPage);
                }
            }
        });
    }

    onNextButtonClicked(page: ProfilePage, redirect: boolean) {
        const currentIndex = this.forwardNavigaton.indexOf(page);
        this.currentPage = this.forwardNavigaton[currentIndex + 1];
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        this.currentProgress = this.currentProgress + 25;
        if (document.getElementById('progressPercent')) {
            document.getElementById('progressPercent').style.width = this.currentProgress + '%';
        }
        if (redirect) {
            this.navigateToCurrentPage(this.currentPage);
        }
    }

    onPrevButtonClicked(page: ProfilePage, redirect: boolean) {
        const currentIndex = this.prevNavigaton.indexOf(page);
        if (currentIndex !== -1) {
            this.currentPage = this.prevNavigaton[currentIndex - 1];
        } else {
            this.currentPage = ProfilePage.Experience;
        }

        if (this.currentPage >= 0) {
            if (page === ProfilePage.Marketability) {
                this.currentProgress = 75;
                this.currentPage = ProfilePage.Experience;
                if (!redirect) {
                    window.history.back();
                }


                // this.navigateToCurrentPage(this.currentPage);
            } else {
                this.currentProgress = this.currentProgress - 25;
            }
            if (redirect) {
                // window.history.back();
                this.navigateToCurrentPage(this.currentPage);
            }
            this.setPageTitle(this.currentPage);

            this.setNavButtonText(this.currentPage);
            setTimeout(() => {
                if (document.getElementById('progressPercent')) {
                    document.getElementById('progressPercent').style.width = this.currentProgress + '%';
                }
            }, 100);
        }
    }

    onLogoutButtonClicked() {
        const logout = window.open('https://www.linkedin.com/m/logout/', '_blank', 'height=500,width=400,top=100,left=500');
        this.authService.logout();
    }

    setPageTitle(page) {
        if (page !== 'undefined') {
            this.pageTitle = Constants.PageTitles.find(elm => elm.Id === page).Name;
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
        });

    }
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
                break;
            case ProfilePage.Marketability:
                this.router.navigate(['home/score'], { queryParams: { 'score': this.score } });
                break;
            default:
                this.router.navigate(['']);
                break;
        }
    }

    onLocationChanged(path: string) {
        let currentPage: ProfilePage;
        if (path === '/home/profile') {
            currentPage = ProfilePage.Profile;
        } else if (path === '/home/skills') {
            currentPage = ProfilePage.Skill;
        } else if (path === '/home/experience') {
            currentPage = ProfilePage.Experience;
        } else if (path === '/home/calculation') {
            currentPage = ProfilePage.Computation;
        } else if (path === '/home/score') {
            currentPage = ProfilePage.Marketability;
        }

        if (this.currentPage === ProfilePage.Profile && currentPage === ProfilePage.Profile) {
            // this.router.navigate(['home/profile']);
        } else if (currentPage < this.currentPage) {
            if (currentPage === ProfilePage.Computation) {
                this.onPrevButtonClicked(this.currentPage, false);
            } else {
                this.onPrevButtonClicked(this.currentPage, true);
            }

        } else if (currentPage > this.currentPage) {
            this.onNextButtonClicked(this.currentPage, true);
        } else {
        }
    }

}
