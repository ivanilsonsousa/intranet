import React from "react";
import BreadCrumb from "../BreadCrumb"
import "./styles.css";

function Container(props) {
  return (
    <div className={"content-body " + props.className} {...props} >
      { props.children }
    </div>
  );
}

function Content(props) {
  return (
    <div {...props} className={"container-fluid pb-5 mx-sm-auto " + props.className} >
      { props.children }
    </div>
  );
}

function HeaderDescription({icon, iconTam, title, children, data, path, setStackParent, stackParent, ...props}) {
  return (
    <>
    <div className="container-fluid">
      <div className="container-fluid d-flex align-items-baseline" {...props }>
        <div className="d-flex align-items-end pl-2 pt-5">
          <img src={icon} style={{ width: `${iconTam}px` }} alt={title} />
          <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
            {title}
          </h3>
        </div>
        { children }
      </div>

      {stackParent && (
        <BreadCrumb
          data={stackParent}
          path={path}
          setStackParent={setStackParent}
          stackParent={stackParent}
        />
      )}

      <hr />
    </div>  
    </>
  );
}

export default Container;
export { Container, Content, HeaderDescription };
