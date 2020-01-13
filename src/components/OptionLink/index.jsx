import React from 'react'

import './styles.css'

function OptionLink(props) {

    let classes = 'card-option text-center d-flex flex-column p-2 align-items-center justify-content-sm-center m-0 ' + props.className

    return (
        <div 
            className={ classes }
            style={{ ...props.decorations }}
        >
            <img src={props.image} style={{ height: "55px"}}/>
            <span className="mt-2">{props.legend}</span>
        </div>
    )
}

export default OptionLink;