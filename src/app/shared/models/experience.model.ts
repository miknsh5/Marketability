import { CompanyInfo } from './CompanyInfo.model';

export class Experience {

    WorkExperience: Array<CompanyInfo>;

    constructor() {
        this.WorkExperience = new Array<CompanyInfo>();
    }
}
