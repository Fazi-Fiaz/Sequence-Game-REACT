// import { List } from './style';

export const CreateCardsList = (props) => {
  return (
    <>
      <li className={props.className}
        id={props.id}
        data-x={props.dataX} color={props.color ? props.color : undefined}
        onClick={(e) => props.PlayerClickCardId(e)} data-y={props.dataY} cardid={props.cardId}>
        <img src={props.srcimg} alt={props.id} />
      </li>
    </>
  )
}
