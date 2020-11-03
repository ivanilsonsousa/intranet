import React from "react";
import Carousel from "nuka-carousel";
import "./styles.css";

function CardOption({ photos }) {
  return (
    <Carousel
      autoplay
      wrapAround={photos.length === 1 ? false : true}
      renderCenterLeftControls={() => <></>}
      renderCenterRightControls={() => <></>}
      className="carrousel-custom"
    >
      {photos.map((photo) => (
        <img key={photo._id} src={photo.file_url} alt={photos.title} />
      ))}
    </Carousel>
  );
}

export default CardOption;
