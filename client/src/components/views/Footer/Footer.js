import React from 'react'

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem'
        }}>
            <p style={{ color: "#1890ff" }}> fam<span style={{ color: "darkgrey" }}>cloud</span></p>
        </div>
    )
}

export default Footer
