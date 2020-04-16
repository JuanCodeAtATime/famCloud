import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd';

function PhotoInfo(props) {

    const [Photo, setPhoto] = useState({})

    useEffect(() => {

        setPhoto(props.detail)

    }, [props.detail])

    return (
        <div>
            <Descriptions title="Photo Info">
                <Descriptions.Item label="Country"> {Photo.name}</Descriptions.Item>
                <Descriptions.Item label="Year"> {Photo.year}</Descriptions.Item>
                <Descriptions.Item label="Note"> {Photo.description}</Descriptions.Item>
            </Descriptions >

            <br />
            <br />

        </div >
    )
}

export default PhotoInfo
