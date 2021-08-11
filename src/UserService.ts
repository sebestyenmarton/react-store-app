import { makeAutoObservable, makeObservable } from "mobx";
import { BaseService } from "./BaseService";
import { User } from "./User";

export class CompanyService extends BaseService {
    endpoint: string = 'https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/companies';
}

export class UserService extends BaseService {
    endpoint: string = 'https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/users';

    userNameSearch: string = '';
    setUserNameSearch(userNameSearch: string) { this.userNameSearch = userNameSearch; }

    newAvatarUrl: string = '';
    setNewAvatarUrl(newAvatarUrl: string) { this.newAvatarUrl = newAvatarUrl; }

    newUserName: string = '';
    setNewUserName(newUserName: string) { this.newUserName = newUserName; }

    onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setUserNameSearch(event.target.value);
    };
  
    onNewAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setNewAvatarUrl(event.target.value);
    };
  
    onNewUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setNewUserName(event.target.value);
    };
  
    search = (user: User): boolean => {
      return user.username.toLowerCase().includes(this.userNameSearch.trim().toLowerCase());
    }
  
    onAddUser = () => {
        const newItem = {
            avatar: this.newAvatarUrl, 
            username: this.newUserName,
            companyId: "1"  
        };        
        this.create(newItem);
    }
  
    constructor() {
        super();
        makeObservable(this, {});
        this.getList().then(users => this.setItems(users));
    }
}
