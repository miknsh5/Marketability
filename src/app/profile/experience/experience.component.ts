import { Component, OnInit } from '@angular/core';
import { Experience, ProfilePage, PersonProfile } from '../../index';

@Component({
  selector: 'mkb-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  CurrentProfileExperience: Experience;
  constructor() {

  }
  ngOnInit() {
    const personProfile: PersonProfile = JSON.parse(localStorage.getItem('profileInfo'));
    this.CurrentProfileExperience = personProfile.Experience;
  }
}
