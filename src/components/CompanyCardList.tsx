import { CardList } from "./CardList"
import { AvatarCard } from "./AvatarCard";
import { Company } from "../model/Company";
import { CompanyStore } from "../stores/CompanyStore";
import { observer } from "mobx-react-lite";
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { ReactComponent as Logo } from '../img/add2.svg';

interface CompanyCardListProps {
    store: CompanyStore;
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
        }),);

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
        onEdit
    } = props.store;

    const classes = useStyles();    

    const getUser = (companyId: string): string => {
        const users = props.store.rootStore.userStore.items.filter(user => user.companyId === companyId);
        if (users.length > 0) {
            return ' (' + users.length + ')'; // (2)
        } else {
            return '';
        }
    }

    return (
        <div className='contentPage' >
            <div className='formField'>          
                <div className='add__formFieldBox'>
                    <Logo className='logo'/>
                    <div className='add__formField'>
                        <div className='add__formFieldTitle'>Add a new user:</div>
                        <TextField value={newCompanyTitle} onChange={onNewCompanyTitleChange} className="input" id="filled-textarea" size="small" label={<b className="labelText" >Company title</b>} placeholder="Typ a title" multiline variant="filled" />
                        <TextField value={newCompanyDescription} onChange={onNewCompanyDescriptionChange} className="input" id="filled-textarea" size="small" label={<b className="labelText" >Company Description</b>} placeholder="Type a description" multiline variant="filled" />
                        <Button  onClick={onAddCompany} variant="contained" color="default" startIcon={<CloudUploadIcon />}>Upload</Button>
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
                itemRenderer={(item: Company) => (
                    <AvatarCard 
                        item={{ id: item.id, title: item.name + getUser(item.id), description: item.description }} 
                        onDelete={onDelete} 
                        onEdit={onEdit}
                        key={item.id} 
                    />
                )}
            />
        </div>
    )
})