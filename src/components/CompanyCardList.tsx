import { CardList } from "./CardList"
import { AvatarCard } from "./AvatarCard";
import { Company } from "../model/Company";
import { CompanyStore } from "../stores/CompanyStore";
import { observer } from "mobx-react-lite";

interface CompanyCardListProps {
    store: CompanyStore;
}

export const CompanyCardList = observer((props: CompanyCardListProps) => {
    const { 
        filteredItems: items, 
        searchTerm,
        onSearch,
        newCompanyTitle, 
        newCompanyDescription,
        onAddCompany,
        onNewCompanyTitleChange,
        onNewCompanyDescriptionChange,
        onDelete,
        //onEdit
    } = props.store;

    const getUser = (companyId: string): string => {
        const users = props.store.rootStore.userStore.items.filter(user => user.companyId === companyId);
        if (users.length > 0) {
            return ' (' + users.length + ')'; // (2)
        } else {
            return '';
        }
    }

    return (
        <div>
            <input placeholder='Search...' value={searchTerm} onChange={onSearch}></input> 
            <div>
                <input placeholder='Title' value={newCompanyTitle} onChange={onNewCompanyTitleChange}></input>
                <input placeholder='Description' value={newCompanyDescription} onChange={onNewCompanyDescriptionChange}></input>
                <button onClick={onAddCompany}>Add</button>
            </div>  
            <CardList 
                items={items} 
                itemRenderer={(item: Company) => (
                    <AvatarCard 
                        item={{ id: item.id, title: item.name + getUser(item.id), description: item.description }} 
                        onDelete={onDelete} 
                        //onEdit={onEdit}
                        key={item.id} 
                    />
                )}
            />
        </div>
    )
})