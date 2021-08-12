import { action, computed, makeObservable, observable } from "mobx";
import { Company } from "../model/Company";
import { BaseStore } from "./BaseStore";
import { RootStore } from "./RootStore";

export class CompanyStore extends BaseStore<Company> {
    public rootStore: RootStore;
    public endpoint: string = 'https://60fd9bcc1fa9e90017c70f18.mockapi.io/api/companies';

    public searchTerm: string = '';
    public setSearchTerm(searchTerm: string) { this.searchTerm = searchTerm; }
    public onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setSearchTerm(event.target.value);
    };

    public get filteredItems(): Company[] {
        let items = this.items;
        items = items.filter(company => company.name
            .toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase())
        );
        return items;
    }

    constructor(rootStore: RootStore) {
        super();
        this.rootStore = rootStore;
        makeObservable(this, {
            filteredItems: computed,
            searchTerm: observable,
            setSearchTerm: action.bound,
        });
        this.getList().then(company => this.setItems(company));
    }
}

