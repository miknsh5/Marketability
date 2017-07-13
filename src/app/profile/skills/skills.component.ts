import { Component, Input, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { Skill, ProfilePage, PersonProfile } from '../../index';

@Component({
    selector: 'mkb-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit,AfterViewInit {

    // @Input() CurrentProfileSkills: Array<Skill> = Array<Skill>();
    CurrentProfileSkills: Array<Skill>;
    @Output() currentPage = new EventEmitter<ProfilePage>();

    constructor() {
console.log('============skills Page===============');
    }
    ngOnInit(){
 console.log(localStorage.getItem('profileInfo'));
        let personProfile:PersonProfile=JSON.parse(localStorage.getItem('profileInfo'));
        this.CurrentProfileSkills=personProfile.Skills;
    }
    ngAfterViewInit() {
        this.currentPage.emit(ProfilePage.Skill);
    }
}
