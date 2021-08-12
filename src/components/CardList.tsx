interface CardListProps<T> {
    items: T[];
    itemRenderer: (item: T) => JSX.Element;
}

export function CardList <T>(props: CardListProps<T>) {
    const { items, itemRenderer } = props;

    return (
        <div className='grid-container'>
            {items.map(item => itemRenderer(item))}
            {/* {items.map(item => <UserCard user={item} onDelete={onDelete} key={item.username} />)} */}
        </div>
    );
}