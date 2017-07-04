import { Component, Input, AfterViewInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { Experience, ProfilePage } from '../../index';

@Component({
  selector: 'mkb-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements AfterViewInit {

  @Input() CurrentProfileExperience: Experience;
  @Output() currentPage = new EventEmitter<ProfilePage>();

  constructor() {

  }
  ngAfterViewInit() {
    this.currentPage.emit(ProfilePage.Experience);
  }
}
