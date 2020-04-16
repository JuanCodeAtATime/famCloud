import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, year } from './Sections/Datas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { auto } from 'async';
// import SearchFeature from './Sections/SearchFeature';

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

    // const updateSearchTerms = (newSearchTerm) => {

    //     const variables = {
    //         skip: 0,
    //         limit: Limit,
    //         filters: Filters,
    //         searchTerm: newSearchTerm
    //     }

    //     setSkip(0)
    //     setSearchTerms(newSearchTerm)

    //     getPhotos(variables)
    // }


    return (
        <div>
            <div style={{ textAlign: 'center' }}>

                <h2 style={{
                    color: "#1890ff",
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                    display: "inline-block",
                    lineHeight: "auto",
                    fontSize: "4rem",
                    WebkitTextStrokeColor: "white",
                    WebkitTextStrokeWidth: "1px",
                    marginTop: "7.5rem",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "10px"
                }}><b>fam<span style={{ color: "grey" }}>cloud</span></b></h2>
            </div>

            <div style={{ width: '75%', margin: '3rem auto', marginTop: "50px" }}>


                {/* Filter  */}

                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24} >
                        <CheckBox
                            list={continents}
                            handleFilters={filters => handleFilters(filters, "continents")}
                        />
                    </Col>
                    <Col lg={12} xs={24}>
                        <RadioBox
                            list={year}
                            handleFilters={filters => handleFilters(filters, "year")}
                        />
                    </Col>
                </Row>


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
