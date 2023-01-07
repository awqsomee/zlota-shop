import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Card, Form, Row } from 'react-bootstrap'

const BrandBar = observer(() => {
    const { item } = useContext(Context)

    return (
        <Form className="d-flex">
            {item.brands.map((brand) => (
                <Card
                    style={{ cursor: 'pointer' }}
                    key={brand.id}
                    className="p-3"
                    onClick={() => item.setSelectedBrand(brand)}
                    border={brand.id === item.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            ))}
        </Form>
    )
})

export default BrandBar
