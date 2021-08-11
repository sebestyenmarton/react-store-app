import { User } from "./User";
import Button from '@material-ui/core/Button';

interface UserCardProps {
    user: User;
    onDelete: (id: string) => Promise<void>;
}

export function UserCard(props: UserCardProps) {

    let { user, onDelete } = props;

    return (<div className='grid-item'>
        <img src={user.avatar} width='64' height='64' alt='pista' />
        <p>{user.username}</p>
        <Button 
            variant="contained" 
            color="secondary"
            onClick={() => onDelete(user.id)}
        > Delete </Button>
    </div>);
}