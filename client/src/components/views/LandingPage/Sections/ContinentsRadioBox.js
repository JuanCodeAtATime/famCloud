import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;


function ContinentsRadioBox(props) {

    const [Value, setValue] = useState([])

    const renderRadioBox = () => (
        props.list && props.list.map((value) => (
            <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']} style={{
                backgroundColor: "transparent"
            }}>
                <Panel header="Continent" key="0">
                    <Radio.Group onChange={handleChange} value={Value}>

                        {renderRadioBox()}

                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default ContinentsRadioBox
