import React from 'react'

function Footer() {
    return (
        <div style={{
            height: '10px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem'
        }}>
            <b style={{
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                color: "#1890ff",
                borderRadius: "5px",
                padding: "5px",
                marginBottom: "2px"
            }}> fam<span style={{ color: "white" }}>cloud</span></b>
        </div>
    )
}

export default Footer
