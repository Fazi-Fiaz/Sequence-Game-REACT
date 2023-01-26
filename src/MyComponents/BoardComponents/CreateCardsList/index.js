// import { List } from './style';

export const CreateCardsList = (props) => {
  return (
    <>
      {props.emptyDiv ?
        (<li className={props.className} data-x={props.dataX} data-y={props.dataY}>
          <div className={props.emptyDiv}>
            <img src={props.srcimg} alt="Corner Images" />
          </div>
        </li>)
        :
        (
          <li className={props.className}
            id={props.id}
            data-x={props.dataX} onClick={() => props.cardClickFunction(props.id)} data-y={props.dataY} card={props.cardId}>
            <img src={props.srcimg} alt={props.id} />
          </li>
        )
      }
    </>
  )
}
