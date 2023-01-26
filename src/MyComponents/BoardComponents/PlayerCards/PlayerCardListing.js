import { playerName, maxPlayerCards } from '../../../Constants';
import { CreateCardsList } from '../CreateCardsList';
import { v4 } from 'uuid';

export const PlayerCardListing = (props) => {

    const cardClickFunction = (id) => {
        console.log("Card ID Card Listing Component", id);
    }
    let singlePlayerCard = [];
    let itemList = [];
    for (let i = 0; i < maxPlayerCards; i++) {
        let elem = <CreateCardsList
            className='handcard'
            id={props.shuffle[0]}
            srcimg={require(`../../../assets/cards/${props.shuffle[0]}.png`)}
            cardClickFunction={cardClickFunction}
            key={v4()}
        />
        singlePlayerCard.push(props.shuffle[0]);
        props.shuffle.shift();
        itemList.push(elem);
    }
    props.setdata(singlePlayerCard);
    return (
        <div className='positions' id={`positions${props.id}`}>
            <div>{playerName[props.id]}</div>
            <div className='hand-cards'>
                <ul id={`user${props.id}`}>
                    {itemList}
                </ul>
            </div>
        </div >
    )
}

