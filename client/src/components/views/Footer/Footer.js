import React from 'react'

function Footer() {
    return (
        <div style={{
            height: '5px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem'
        }}>
            <b style={{
                backgroundColor: "black",
                color: "#1890ff",
                borderRadius: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginBottom: "5px"
            }}>

                fam<span style={{ color: "white" }}>cloud </span>

                <span style={{ fontSize: ".75rem" }}>
                    <a style={{ textDecoration: "None" }} href="https://juancodeatatime.github.io/myPortfolio/">
                        By Juan Rivera
            </a>
                </span>

            </b>

        </div>
    )
}

export default Footer
