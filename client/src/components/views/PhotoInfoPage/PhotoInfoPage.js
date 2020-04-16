import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import PhotoImage from './Sections/PhotoImage';
import PhotoInfo from './Sections/PhotoInfo';

function PhotoInfoPage(props) {
    const photoId = props.match.params.photoId
    const [Photo, setPhoto] = useState([])

    useEffect(() => {
        Axios.get(`/api/photo/photos_by_id?id=${photoId}&type=single`)
            .then(response => {
                setPhoto(response.data[0])
            })

    }, [])

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center', color: "white" }}>
                <h1 style={{ color: 'white' }}>{Photo.name}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >

                <Col lg={12} xs={24}>
                    <PhotoInfo
                        detail={Photo} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ margin: "8px" }} >
                <Col lg={12} xs={24}>
                    <PhotoImage detail={Photo} />
                </Col>
            </Row>
        </div>
    )
}

export default PhotoInfoPage
