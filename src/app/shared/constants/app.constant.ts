import { ProfilePage } from '../enums/index';

export class Constants {
    public static PageTitles = [
        { ID: ProfilePage.Profile, Name: 'Profile' },
        { ID: ProfilePage.Skill, Name: 'Skills' },
        { ID: ProfilePage.Experience, Name: 'Experience' },
        { ID: ProfilePage.Computation, Name: 'Calculating' },
        { ID: ProfilePage.Marketability, Name: 'Marketability' }
    ];

    public static forwardNavigation: Array<ProfilePage> = [
        ProfilePage.Profile,
        ProfilePage.Skill,
        ProfilePage.Experience,
        ProfilePage.Computation,
        ProfilePage.Marketability
    ];

    public static backNavigation: Array<ProfilePage> = [
        ProfilePage.Profile,
        ProfilePage.Skill,
        ProfilePage.Experience,
        ProfilePage.Marketability
    ];
}
