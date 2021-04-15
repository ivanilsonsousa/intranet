import React from "react";
import "./styles.css";

function Container(props) {
  return (
    <div {...props} >
      { props.children }
    </div>
  );
}

function Content(props) {
  return (
    <div {...props} className={"container-fluid pb-5 mx-sm-auto" + props.className} >
      { props.children }
    </div>
  );
}

function HeaderDescription({icon, iconTam, title, children}) {
  return (
    <>
      <div className="container-fluid d-flex align-items-baseline">
        <div className="d-flex align-items-end pl-2 pt-5">
          <img src={icon} style={{ width: `${iconTam}px` }} alt={title} />
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
            {title}
          </h3>
          { children }
        </div>
      </div>
      <hr />
    </>
  );
}

export default Container;
export { Container, Content, HeaderDescription };
