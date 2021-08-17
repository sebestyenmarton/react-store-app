import { action, computed, makeObservable, observable } from "mobx";
import { Company } from "../model/Company";
import { BaseStore } from "./BaseStore";
import { RootStore } from "./RootStore";

export class CompanyStore extends BaseStore<Company> {
    public rootStore: RootStore;
    public endpoint: string = 'https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/companies';

    public searchTerm: string = '';
    public setSearchTerm(searchTerm: string) { this.searchTerm = searchTerm; }

    public newCompanyTitle: string = '';
    public setNewCompanyTitle(newCompanyTitle: string) { this.newCompanyTitle = newCompanyTitle; }

    public newCompanyDescription: string = '';
    public setNewCompanyDescription(newCompanyDescription: string) { this.newCompanyDescription = newCompanyDescription; }

    public onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setSearchTerm(event.target.value);
    };

    public onNewCompanyTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setNewCompanyTitle(event.target.value);
    };
  
    public onNewCompanyDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setNewCompanyDescription(event.target.value);
    };

    public get filteredItems(): Company[] {
        let items = this.items;
        items = items.filter(company => company.name
            .toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase())
        );
        return items;
    }

    public onAddCompany = () => {
        const newItem = {
            name: this.newCompanyTitle, 
            description: this.newCompanyDescription,
        };        
        this.create(newItem);
    }

    public onEdit = () => {
        const settedItem = {
            name: this.newCompanyTitle, 
            description: this.newCompanyDescription,
        };        
        this.update(settedItem);
    }  

    constructor(rootStore: RootStore) {
        super();
        this.rootStore = rootStore;
        makeObservable(this, {
            filteredItems: computed,
            searchTerm: observable,
            newCompanyTitle: observable,
            newCompanyDescription: observable,
            setSearchTerm: action.bound,
        });
        this.getList().then(company => this.setItems(company));
    }
}

