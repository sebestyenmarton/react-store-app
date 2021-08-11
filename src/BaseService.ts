import { action, makeObservable, observable } from "mobx";

export abstract class BaseService {
    endpoint: string = '';

    items: any[] = [];
    setItems(items: any[]) { this.items = items; }

    async getList(): Promise<any[]> {
        const result = await fetch(this.endpoint);
        const items = await result.json();
        return items;
    }

    async create(data: any): Promise<any> {
        try {
            const result = await fetch(
                this.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }
            );
            const user = await result.json();
            this.setItems([ user, ...this.items ]);
            // this.setNewAvatarUrl('');
            // this.setNewUserName('');
            return user;
        } catch(err) {
            console.error(err);
        }
    }

    onDelete = async (id: string): Promise<void> => {
        try {
            const result = await fetch(
                `${this.endpoint}/${id}`, {
                    method: 'DELETE',
                }
            );
            await result.json();
            this.setItems(this.items.filter(item => item.id !== id));
        } catch(err) {
            console.error(err);
        }
    }

    constructor() {
        makeObservable(this, {
            items: observable,
            setItems: action.bound
        });
    }
}