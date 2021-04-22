import React, { useEffect, useState } from "react";
import Gallery from "react-grid-gallery";
import Header from "../../components/Header";
import { Container, Content, HeaderDescription } from "../../components/Layout";

import api from "../../services/api";
import gallery_icon from "../../assets/gallery.svg";

function GalleryViewer() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/photos');
      
      const aux = data.map(photo => {
        return {
          src: photo.file_url,
          thumbnail: photo.file_url,
          thumbnailWidth: 320,
          thumbnailHeight: 212
        };
      })

      setImages(aux);

    })()
  }, []);

  return (
    <>
      <Header />
      <Container>
        <HeaderDescription icon={gallery_icon} title="Galeria de Fotos" iconTam="45" />
        <Content>
          <Gallery
            images={images}
            enableImageSelection={false}
            backdropClosesModal
          />
        </Content>
      </Container>
    </>
  );
}

export default GalleryViewer;
