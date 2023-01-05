import React from 'react'
import { Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ITEM_ROUTE } from '../utils/consts'

const OrderItem = ({ item }) => {
    const navigate = useNavigate()
    return (
        <div
            style={{ display: 'flex', direction: 'row', cursor: 'pointer' }}
            onClick={() => navigate(ITEM_ROUTE + '/' + item.item.id)}
        >
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + item.item.img} />
            <div
                className="m-3"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {item.item.name}
            </div>

            <div
                className="m-3"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifySelf: 'end',
                }}
            >
                x{item.amount}
            </div>
        </div>
    )
}

export default OrderItem
