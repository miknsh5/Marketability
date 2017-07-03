import { Component, OnInit } from '@angular/core';
import { ProfilePage, PersonProfile, Skill, Profile, Experience, CompanyInfo } from "app";

@Component({
    selector: 'mkb-profile-manager',
    templateUrl: './profile-manager.component.html',
    styleUrls: ['./profile-manager.component.css']
})

export class ProfileManagerComponent implements OnInit {
    
    CurrentPage : ProfilePage;
    CurrentProfile : PersonProfile;

    constructor() {

    }

    ngOnInit(): void {

        this.CurrentPage = ProfilePage.Experience;
        
        let dummyPerson = new PersonProfile();
        
        let dummyProfile = new Profile();
        dummyProfile.Name = 'Pradeep';
        dummyProfile.City = 'Thane';
        dummyProfile.Occupation = 'IT Services';
        
        let dummySkills = Array<Skill>();

        ["C#","Java","JavaScript", "Python"].forEach(elm => {
            let skill = new Skill();
            skill.SkillName = elm;
            dummySkills.push(skill);
        });

        let dummyExperience = new Experience();
        let dummyWorkExps = Array<CompanyInfo>();
    
        ["HDFC","L&T","OmniTech","Cennest"].forEach(elm => {
            let companyInfo1 = new CompanyInfo();
            companyInfo1.CompanyName = elm;
            companyInfo1.Title = "XYZ";
            companyInfo1.StartDate = "01/02/2011";
            companyInfo1.EndDate = "30/07/2013";
            dummyWorkExps.push(companyInfo1);
        });
        dummyExperience.WorkExperience = dummyWorkExps;

        dummyPerson.Skills = dummySkills;
        dummyPerson.Profile = dummyProfile;
        dummyPerson.Experience = dummyExperience;

        this.CurrentProfile = dummyPerson;
    }
}
