import { Component, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { Experience, ProfilePage } from '../../index';

@Component({
  selector: 'mkb-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements AfterViewInit {

  @Input() Experience: Experience;
  @Output() afterViewInit = new EventEmitter<ProfilePage>();

  constructor() { }

  ngAfterViewInit() {
    this.afterViewInit.emit(ProfilePage.Experience);
  }
}
