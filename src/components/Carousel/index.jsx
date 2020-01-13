import React from 'react';
import Carousel from 'nuka-carousel';
import './styles.css'

import foto from '../../assets/foto.png'

export default class CardOption extends React.Component {

    render() {
        return (
            <Carousel autoplay wrapAround renderCenterLeftControls renderCenterRightControls > 
                <img src={foto} />
                <img src="http://placehold.it/500x300/ffffff/c0392b/&text=slide1" />
                <img src="http://placehold.it/500x300/ffffff/c0392b/&text=slide2" />
                <img src="http://placehold.it/500x300/ffffff/c0392b/&text=slide3" />
                <img src="http://placehold.it/500x300/ffffff/c0392b/&text=slide4" />
                <img src="http://placehold.it/500x300/ffffff/c0392b/&text=slide5" />
                <img src="http://placehold.it/500x300/ffffff/c0392b/&text=slide6" />
            </Carousel>
        );
    }
}