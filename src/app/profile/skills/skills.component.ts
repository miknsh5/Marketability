import { Component, OnInit } from '@angular/core';
import { Skill, ProfilePage, PersonProfile } from '../../index';

@Component({
    selector: 'mkb-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

    CurrentProfileSkills: Array<Skill>;

    constructor() {
    }
    ngOnInit() {
        const personProfile: PersonProfile = JSON.parse(localStorage.getItem('profileInfo'));
        this.CurrentProfileSkills = personProfile.Skills;
    }
}
