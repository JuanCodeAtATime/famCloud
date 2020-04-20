import React, { useState } from 'react';
import Location from "../../Locations";
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';


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

//Create new variable to handle years options, ex. 
// const Year = [
//     { key: 0, value: "Anytime" },
//     { key: 1, value: "2010" },
//     { key: 2, value: "2011" },
//     { key: 3, value: "2012" },
//     { key: 4, value: "2013" },
//     { key: 5, value: "2014" },   
// ]


function UploadPhoto(props) {
    const [origin, setOrigin] = useState({});
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [Year, setYear] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([])


    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onYearChange = (event) => {
        setYear(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }


    const onSubmit = (event) => {
        event.preventDefault();


        if (!origin || !DescriptionValue || !Year ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: origin,
            description: DescriptionValue,
            year: Year,
            images: Images,
            continents: ContinentValue,
        }

        Axios.post('/api/photo/uploadPhoto', variables)
            .then(response => {
                if (response.data.success) {
                    alert(variables.title.name + " photo successfully uploaded.")
                    props.history.push('/')
                } else {
                    alert('Sorry.  Failed to upload photo')
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
                    onChange={onYearChange}
                    placeholder="Enter four digit year"
                    value={Year}
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

export default UploadPhoto


