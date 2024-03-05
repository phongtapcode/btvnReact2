import './ItemData.scss'

function ItemData({data,onClickPut,onClickDelete}){
    return (
        <div className="data">
            <div className="data__id">{data.id}</div>
            <div className="data__avatar"><img src={data.avatar}/></div>
            <div className="data__email">{data.email}</div>
            <div className="data__city">{data.city}</div>
            <div className='data__icon'><i className="fa-solid fa-hammer" onClick={onClickPut}></i><a href='#'><i className="fa-solid fa-trash-can" onClick={onClickDelete}></i></a></div>
        </div>
    )
}

export default ItemData;