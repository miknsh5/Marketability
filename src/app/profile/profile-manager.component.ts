import { Component } from '@angular/core';
import { PersonProfile } from '../shared/models'
import { Profile } from '../shared/models'

@Component({
    selector: 'mkb-profile-manager',
    templateUrl: './profile-manager.component.html',
    styleUrls: ['./profile-manager.component.css']
})
export class ProfileManagerComponent {
    
    currentProfile : PersonProfile;
    score: string;

    constructor() {

    }

    ngOnInit() {
    this.currentProfile = new PersonProfile();
    this.currentProfile.Profile =  new Profile();
    this.currentProfile.Profile.City = "Seattle";
    this.currentProfile.Profile.Name = "John Smith";
    this.currentProfile.Profile.Occupation = "Software Developer";
    this.score = "37";
  }
}
