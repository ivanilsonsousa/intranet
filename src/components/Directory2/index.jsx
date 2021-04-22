import React, { useContext   } from "react";
import { Link } from "react-router-dom";
import { ClipLoader as Spinner } from "react-spinners";
import ContextMenu from "../ContextMenu2";
import "./styles.css";

import folder_open from "../../assets/folder_new.svg";
import iconPDF from "../../assets/pdf_new.svg";
import iconJPG from "../../assets/jpg.svg";
import iconWORD from "../../assets/word.svg";
import iconEXCEL from "../../assets/excel_new.svg";
import iconSLIDE from "../../assets/powerpoint.svg";
import iconVIDEO from "../../assets/video.svg";
import iconDefault from "../../assets/file-black.svg";

import empty from "../../assets/empty.svg";

import { Context } from "../../context/AuthContext";

const DIR = process.env.REACT_APP_DIR;

function chooseIcon(format = "") {
  let icon = iconDefault;
  const valuesPDF = [iconPDF, ".pdf"];
  const valuesVIDEO = [iconVIDEO, ".mp4"];
  const valuesJPG = [iconJPG, ".jpeg", ".jpg", ".jij", ".png"];
  const valuesWORD = [iconWORD, ".doc", ".docx"];
  const valuesEXCEL = [iconEXCEL, ".xls", ".xlsx", ".slk"];
  const valuesSLIDE = [iconSLIDE, ".ppt", ".pptx"];

  const formats = [
    valuesPDF,
    valuesWORD,
    valuesSLIDE,
    valuesJPG,
    valuesEXCEL,
    valuesVIDEO,
  ];

  formats.forEach((element) => {
    if (element.includes(format)) {
      [icon] = element;
      return icon;
    }
  });

  return icon;
}

function cutLegend(legend) {
  if (legend.length < 25) return legend;

  return `${legend.substr(0, 20)}...`;
}

function Option({ item, path }) {
  const classes = "option-dir text-center d-flex flex-column p-2 align-items-center justify-content-baseline m-0";

  return ( 
    item.type === 'folder' ?
      <Link
        to={`/${DIR}/${path}/${item._id}`}
        className={classes}
        title={item.title}
      >
        <img src={folder_open} alt="icone" style={{ height: "55px" }} />
        <span className="mt-2">{cutLegend(item.title)}</span>
      </Link>
      :
      <a
        className={classes}
        href={item.url}
        target="_blank"
        title={item.title}
        rel="noopener noreferrer"
      >
        <img src={chooseIcon(item.format)} style={{ height: "55px" }} alt="logo" />
        <span className="mt-2">{cutLegend(item.title)}</span>
    </a>
    );

}

function Directory(props) {
  const { data, path, load } = props;
  const { authenticated } = useContext(Context);

  if (load) return (
    <div className="container d-flex flex-column align-items-center pt-5 no-touch directory">
      <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
    </div>
  );

  return data?.length ? (
    <div className="directory">
      {data.map(dir => {

        return authenticated ? 
          <ContextMenu
            id={dir._id}
            key={dir._id}
            path={path}
            item={dir}
            setDirUpdate={props.setDirUpdate}
          >
            <Option 
              item={dir}
              path={path}
            />
          </ContextMenu>
        : 
          <Option 
            key={dir._id}
            item={dir} 
            path={path}
          />

      })}
    </div>
  ) : (
    <div className="container d-flex flex-column align-items-center pt-5 no-touch directory">
      <img src={empty} alt="Pasta Vazia" style={{ height: "55px" }} />
      <span className="mt-3">Essa pasta está vazia.</span>
    </div>
  );
}

export default Directory;
