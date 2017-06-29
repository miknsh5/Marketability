import { Component, Input } from '@angular/core';
import { Skill } from "app";

@Component({
    selector: 'mkb-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
    @Input() CurrentProfileSkills: Array<Skill> = [];
    
    constructor() {

    }
}
