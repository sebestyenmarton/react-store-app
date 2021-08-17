import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

interface CardItem {
    id: string;
    avatar?: string;
    title?: string;
    description?:  string;
}

interface AvatarCardProps {
    item: CardItem;
    onDelete: (id: string) => Promise<void>;
    onEdit: (id: string) => void; 
}

export function AvatarCard(props: AvatarCardProps) {
    const { item, onDelete, onEdit } = props;
    return (
        <Card className='grid-item' raised style={{ maxWidth: 200 }}>
            <CardActionArea className='grid-item__child'>
                { item.avatar && (
                    <CardMedia
                        component='img'
                        image={item.avatar}
                        title="Contemplative Reptile"
                    />
                )}
                <CardContent>
                    {item.title && (
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                        </Typography>
                    )}
                    {item.description && (
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.description}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
            <CardActions className="buttons" >
                <Button  onClick={() => onDelete(item.id)} className="button" variant="contained" > 
                    Delete 
                </Button>
                <Button   onClick={() => onEdit(item.id)}  className="button"  variant="contained" color="primary"> 
                    Edit 
                </Button>
            </CardActions>
        </Card>
    );
}