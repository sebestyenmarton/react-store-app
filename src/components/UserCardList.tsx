import { User } from "../model/User"
import { CardList } from "./CardList"
import { AvatarCard } from "./AvatarCard";
import { UserStore } from "../stores/UserStore";
import { observer } from "mobx-react-lite";
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { ReactComponent as Logo } from '../img/add1.svg';

interface UserCardListProps {
    store: UserStore;
}

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            search: {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25),},
                marginLeft: 0,
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    marginLeft: theme.spacing(1),
                    width: 'auto',
                },
            },
            searchIcon: {
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            inputInput: {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    width: '12ch',
                    '&:focus': {
                        width: '20ch',
                    },
                },
            },
        }),
    );

export const UserCardList = observer((props: UserCardListProps) => {
    const { 
        searchTerm, 
        onSearch,
        newAvatarUrl,
        newUserName,
        onAddUser, 
        filteredItems: items,
        onNewUserNameChange,
        onNewAvatarChange,
        onDelete,
        onEdit
    } = props.store;

    
    const classes = useStyles();    

    return (
        <div className='contentPage'>
            <div className='formField'>          
                <div className='add__formFieldBox'>
                    <Logo className='logo'/>
                    <div className='add__formField'>
                        <div className='add__formFieldTitle'>Add a new user:</div>
                        <TextField value={newAvatarUrl} onChange={onNewAvatarChange} className="input" id="filled-textarea" size="small" label={<b className="labelText" >Type the avatar URL</b>} placeholder="Avatar Url" multiline variant="filled" />
                        <TextField value={newUserName} onChange={onNewUserNameChange} className="input" id="filled-textarea" size="small" label={<b className="labelText" >Type the User Name</b>} placeholder="User Name" multiline variant="filled" />
                        <Button onClick={onAddUser} variant="contained" color="default" startIcon={<CloudUploadIcon />}>Upload</Button>
                    </div>  
                </div>  
                <div className='searchContainer'>
                    <h4>Search for an existing user: </h4>
                    <div id='search' className={classes.search}>
                        <div className={classes.searchIcon}><SearchIcon /></div>
                        <InputBase value={searchTerm} onChange={onSearch} placeholder="Search…" classes={{ input: classes.inputInput,}} className="searchValue" inputProps={{ 'aria-label': 'search' }}/>
                    </div>
                </div>
            </div>
            <CardList 
                items={items} 
                itemRenderer={(item: User) => (
                    <AvatarCard 
                        item={{ id: item.id, title: item.username, avatar: item.avatar }} 
                        onDelete={onDelete} 
                        key={item.id} 
                        onEdit={onEdit}
                    />
                )}
            />
        </div>
    )
})