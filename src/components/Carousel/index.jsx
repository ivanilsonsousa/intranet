import React from "react";
import Carousel from "nuka-carousel";
import "./styles.css";

export default class CardOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: this.props.photos,
    };
  }

  render() {
    return (
      <Carousel
        autoplay
        wrapAround={this.props.photos.length === 1 ? false : true}
        renderCenterLeftControls={() => <></>}
        renderCenterRightControls={() => <></>}
      >
        {this.state.photos.map((photo) => (
          <img key={photo._id} src={photo.file_url} alt="Imagem do Carrousel" />
        ))}
      </Carousel>
    );
  }
}
