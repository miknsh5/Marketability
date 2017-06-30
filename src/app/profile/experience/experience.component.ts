import { Component, Input } from '@angular/core';
import { Experience } from "app";

@Component({
  selector: 'mkb-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  @Input() CurrentProfileExperience : Experience;

  constructor() {

  }
}
