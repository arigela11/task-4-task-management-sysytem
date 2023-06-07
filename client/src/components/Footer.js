import React from 'react'
const Footer = () => {
    var style = {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        padding: "15px",
        position: "absolute",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    };
    var phantom = {
        flexdirection: 'row',
        display: 'block',
        padding: '20px',
        height: '60px',
        width: '100%',
      }
    return(
        <footer style={phantom}>
            <div style={style}>
            <p style={{textAlign: 'center', fontSize: 15}}> Made with &hearts; by Talent 101</p>
            </div>
        </footer>
    )

}

export default Footer;