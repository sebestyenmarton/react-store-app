import { User } from "./User";
import { UserCard } from "./UserCard";

interface UserListProps {
    userList: User[];
    onDelete: (id: string) => Promise<void>;
    search: (user: User) => boolean;
}

export const UserList = (props: UserListProps) => {
    const { userList, onDelete, search } = props;
    return (
        <div className='grid-container'>
            {userList.map(user => (
                search(user) && 
                <UserCard user={user} onDelete={onDelete} key={user.username} />
            ))}
        </div>
    );
}