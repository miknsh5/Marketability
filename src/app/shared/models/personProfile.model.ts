import { Experience } from './Experience.model';
import { Profile } from './profile.model';
import { Skill } from './skill.model';

export class PersonProfile {

    Profile: Profile;
    Skills: Array<Skill>;
    Experience: Experience;
    
}
