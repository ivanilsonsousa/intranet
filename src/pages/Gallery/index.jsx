import React from "react";
import Gallery from "react-grid-gallery";
import Header from "../../components/Header";

import gallery_icon from "../../assets/gallery.svg";

const IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnailWidth: 320,
    isSelected: false,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    caption: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
];

function GalleryViewer() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img src={gallery_icon} style={{ width: "45px" }} alt="DashBoard" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Galeria de Fotos
            </h3>
          </div>
        </div>
        <hr className="my"></hr>
        <div className="container-fluid">
          <Gallery
            images={IMAGES}
            enableImageSelection={false}
            backdropClosesModal
          />
        </div>
      </div>
    </>
  );
}

export default GalleryViewer;
