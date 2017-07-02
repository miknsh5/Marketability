import { Component, OnInit } from '@angular/core';

import { AuthService, Profile, Skill, Experience, PersonProfile, CompanyInfo } from '../shared/index';

@Component({
    selector: 'mkb-profile-manager',
    templateUrl: './profile-manager.component.html',
    styleUrls: ['./profile-manager.component.css']
})
export class ProfileManagerComponent implements OnInit {

    public personProfile: PersonProfile;

    constructor(private authService: AuthService) {
        this.personProfile = new PersonProfile();
    }

    ngOnInit() {
        this.getProfile();
    }

    private getProfile() {
        const accessToken = localStorage.getItem('accessToken');
        this.authService.lock.getUserInfo(accessToken, (error, profile) => {
            if (error) {
                // throw new Error(error);
                alert(error.message);
            }
            this.personProfile.Profile.Name = profile.name;
            this.personProfile.Profile.City = profile.location.name;
            this.personProfile.Profile.Occupation = profile.headline;

            ['C#', 'Java', 'JavaScript', 'Python'].forEach(elm => {
                const skill = new Skill();
                skill.SkillName = elm;
                this.personProfile.Skills.push(skill);
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
                this.personProfile.Experience.WorkExperience.push(companyInfo);
            });
        });
    }
}
