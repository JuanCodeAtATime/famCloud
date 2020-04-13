import React, { useState } from 'react';
// import ReactDOM from "react-dom";
import Location from "../../Locations";
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';
// import Countrylist from "./CountriesList"


const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]



function UploadProductPage(props) {
    const [origin, setOrigin] = useState({});
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([])


    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }


    const onSubmit = (event) => {
        event.preventDefault();


        if (!DescriptionValue || !PriceValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: origin,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded.  The Country is ' + variables.title.name)
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{
            maxWidth: '700px',
            margin: '2rem auto',
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.75)"
        }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload New Photo</Title>
            </div>


            <Form onSubmit={onSubmit}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Country </label>
                <Location value={origin} onChange={setOrigin} placeholder="Enter Country" />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Year</label>
                <Input
                    onChange={onPriceChange}
                    placeholder="Enter four digit year"
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <select onChange={onContinentsSelectChange}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage


