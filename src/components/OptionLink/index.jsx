import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

function OptionLink(props) {

    let classes = 'card-option text-center d-flex flex-column p-2 align-items-center justify-content-sm-center m-0 ' + props.className

    if (props.folder) {
        return(
            <div
            className={ classes }
            onClick={ () => props.func({ parent: props.parent, legend: props.legend}) }
            style={{ backgroundColor: props.backgroundColor, width: props.width ? `${props.width}%` : "25%", color: props.backgroundColor ? "white" : "black" }} >

                <img src={props.image} style={{ height: "55px"}}/>
                <span className="mt-2">{props.legend}</span>
            </div>
        )
    }

    return props.externalLink ?
    
    <a 
      className={ classes }
      href={props.externalLink} 
      target="_blank" 
      style={{ backgroundColor: props.backgroundColor, width: props.width ? `${props.width}%` : "25%", color: props.backgroundColor ? "white" : "black" }} >

        <img src={props.image} style={{ height: "55px"}}/>
        <span className="mt-2" title={props.title ? props.title : ''} >{props.legend}</span>
    </a>

    : 
    
    <Link to={props.to} style={{ width: props.width ? `${props.width}%` : "25%"}} >
        <div 
            className={classes}
            style={{ backgroundColor: props.backgroundColor, color: props.backgroundColor ? "white" : "black" }}
        >
            <img src={props.image} style={{ height: "55px"}}/>
            <span className="mt-2">{props.legend}</span>
        </div>
    </Link>
}

export default OptionLink;