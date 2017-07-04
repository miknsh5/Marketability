import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Skill, ProfilePage } from '../../index';

@Component({
    selector: 'mkb-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit {

    @Input() CurrentProfileSkills: Array<Skill> = Array<Skill>();
    @Output() currentPage = new EventEmitter<ProfilePage>();

    constructor() {

    }
    ngAfterViewInit() {
        this.currentPage.emit(ProfilePage.Skill);
    }
}
