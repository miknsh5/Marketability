import { Component, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { Skill, ProfilePage } from '../../index';

@Component({
    selector: 'mkb-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit {

    @Input() Skills: Array<Skill> = Array<Skill>();
    @Output() afterViewInit = new EventEmitter<ProfilePage>();

    constructor() { }

    ngAfterViewInit() {
        this.afterViewInit.emit(ProfilePage.Skill);
    }
}
