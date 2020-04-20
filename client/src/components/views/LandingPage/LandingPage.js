import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import ContinentsRadioBox from './Sections/ContinentsRadioBox';
import RadioBox from './Sections/RadioBox';
import { continents, year } from './Sections/Datas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { SearchOutlined } from '@ant-design/icons';


const { Meta } = Card;

function LandingPage() {

    const [Photos, setPhotos] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    // const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        continents: [],
        year: []
    })

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getPhotos(variables)

    }, [])

    const getPhotos = (variables) => {
        Axios.post('/api/photo/getPhoto', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setPhotos([...Photos, ...response.data.photos])
                    } else {
                        setPhotos(response.data.photos)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fetch photo data')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true

        }
        getPhotos(variables)
        setSkip(skip)
    }


    const renderCards = Photos.map((photo, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/photo/${photo._id}`} > <ImageSlider images={photo.images} /></a>}
            >
                <Meta
                    title={photo.title.name}
                    description={`Year: ${photo.year}`}
                />
            </Card>
        </Col>
    })


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getPhotos(variables)
        setSkip(0)

    }

    const handleYear = (value) => {
        const data = year;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "year") {
            let yearValues = handleYear(filters)
            newFilters[category] = yearValues

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }



    return (
        <div>
            <div style={{
                textAlign: 'center',
                // border: "solid white 2.5px",
                width: "80%",
                margin: "auto",
                borderRadius: "10px",
                alignContent: "center",
                alignContent: 'center'
            }}>

                <h2 style={{
                    color: "#1890ff",
                    backgroundColor: "transparent",
                    display: "block",
                    lineHeight: "auto",
                    fontSize: "4rem",
                    WebkitTextStrokeColor: "white",
                    WebkitTextStrokeWidth: "1px",
                    marginTop: "2rem",
                    marginBottom: "0",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "10px"

                }}><b>fam<span style={{ color: "white" }}>cloud</span></b></h2>
                <div style={{
                    marginBottom: "0.5rem",
                    alignContent: "center",
                    alignContent: 'center'

                }}>
                    <Row gutter={[13]} style={{ padding: "5px" }} className={"clearfix"}>
                        <Col lg={2} xs={1} style={{ marginRight: ".075px", marginLeft: "1.0rem" }} >
                            <SearchOutlined style={{
                                fontSize: "3.0rem",
                                float: "right",
                                fontWeight: 'bold',
                                color: '#fff',
                                marginTop: ".15rem"

                            }} />
                        </Col>


                        <Col lg={10} s={12} xs={12} style={{ marginLeft: "auto", float: "left" }} >
                            <ContinentsRadioBox
                                list={continents}
                                handleFilters={filters => handleFilters(filters, "continents")}
                            />
                        </Col>
                        <Col lg={10} s={8} xs={8} style={{ marginRight: "auto", float: "left" }} >
                            <RadioBox
                                list={year}
                                handleFilters={filters => handleFilters(filters, "year")}
                            />
                        </Col>
                    </Row>
                </div>
            </div>

            <div style={{ width: '75%', margin: '3rem auto', marginTop: "90px" }}>


                {/* Filter  */}




                {/* Search  */}
                {/* <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                    <SearchFeature
                        refreshFunction={updateSearchTerms}
                    />

                </div> */}


                {Photos.length === 0 ?
                    <div style={{ height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 style={{ color: "white" }}>No Photos To Show (yet...
                            {'\u00A0'}
                            <FontAwesomeIcon
                                icon={faPlaneDeparture}
                                style={{ color: "white", fontSize: "1.5rem" }}
                            />

                            {'\u00A0'}).
                        </h2>
                    </div> :
                    <div>
                        <Row gutter={[16, 16]}>

                            {renderCards}

                        </Row>


                    </div>
                }
                <br /><br />

                {PostSize >= Limit &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={onLoadMore}>Load More</button>
                    </div>
                }


            </div>
        </div>
    )
}

export default LandingPage
