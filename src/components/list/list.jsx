import './list.scss';
import Card from '../cards/cards.jsx';


function List({data}) {
    return(
        <div className="list">
            {data.map(item=> (
                <Card key={item.id} data={item} />
            ))}
        </div>
    )
}

export default List