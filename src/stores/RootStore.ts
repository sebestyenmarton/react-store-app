import { CompanyStore } from "./CompanyStore";
import { UserStore } from "./UserStore";

export class RootStore {
    public userStore: UserStore;
    public companyStore: CompanyStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.companyStore = new CompanyStore(this);
    }
}