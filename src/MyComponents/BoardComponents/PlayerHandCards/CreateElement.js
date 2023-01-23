import { playerName, maxPlayerCards } from '../../../Constants';
import { CreateCardsList } from '../CreateCardsList';
import { v4 } from 'uuid';
import { useState } from 'react';

export const CreateElement = (props) => {
    const [cardclick, setcardclick] = useState('');
    let cardclickfunc = (id) => {
        // setcardclick(id);
        console.log("Card Click Function Launch", setcardclick);
    }
    let singlePlayerCard = [];
    let itemList = [];
    for (let i = 0; i < maxPlayerCards; i++) {
        let elem = <CreateCardsList className='handcard' id={props.shuffle[0]} srcimg={require(`../../../assets/cards/${props.shuffle[0]}.png`)} cardclick={cardclickfunc} key={v4()} />
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

