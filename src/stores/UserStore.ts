import { action, computed, makeObservable, observable } from "mobx";
import { User } from "../model/User";
import { BaseStore } from "./BaseStore";
import { RootStore } from "./RootStore";

export class UserStore extends BaseStore<User> {
    public rootStore: RootStore;
    public endpoint: string = 'https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/users';

    public searchTerm: string = '';
    public setSearchTerm(searchTerm: string) { this.searchTerm = searchTerm; }

    public newAvatarUrl: string = '';
    public setNewAvatarUrl(newAvatarUrl: string) { this.newAvatarUrl = newAvatarUrl; }

    public newUserName: string = '';
    public setNewUserName(newUserName: string) { this.newUserName = newUserName; }

    public onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setSearchTerm(event.target.value);
    };
  
    public onNewAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setNewAvatarUrl(event.target.value);
    };
  
    public onNewUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setNewUserName(event.target.value);
    };
  
    public get filteredItems(): User[] {
        let items = this.items;
        items = items.filter(user => user.username
            .toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase())
        );
        return items;
    }
  
    public onAddUser = () => {
        const newItem = {
            avatar: this.newAvatarUrl, 
            username: this.newUserName,
            companyId: "1"  
        };        
        this.create(newItem);
    }
  
    constructor(rootStore: RootStore) {
        super();
        this.rootStore = rootStore;
        makeObservable(this, {
            filteredItems: computed,
            searchTerm: observable,
            setSearchTerm: action.bound,
        });
        this.getList().then(users => this.setItems(users));
    }
}
