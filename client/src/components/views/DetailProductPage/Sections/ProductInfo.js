import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])



    return (
        <div>
            <Descriptions title="Photo Info">
                <Descriptions.Item label="Country"> {Product.name}</Descriptions.Item>
                <Descriptions.Item label="Year"> {Product.year}</Descriptions.Item>
                <Descriptions.Item label="Note"> {Product.description}</Descriptions.Item>
            </Descriptions >

            <br />
            <br />

        </div >
    )
}

export default ProductInfo
