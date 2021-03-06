import React, { useContext } from "react";
import ContextMenu from "../ContextMenu";
import OptionLink from "../OptionLink";
import "./styles.css";

import folder_open from "../../assets/folder_new.svg";
import iconPDF from "../../assets/pdf_new.svg";
import iconJPG from "../../assets/jpg.svg";
import iconWORD from "../../assets/word.svg";
import iconEXCEL from "../../assets/excel_new.svg";
import iconSLIDE from "../../assets/powerpoint.svg";
import iconVIDEO from "../../assets//video.svg";
import iconDefault from "../../assets/file-black.svg";

import empty from "../../assets/empty.svg";

import { Context } from "../../Context/AuthContext";

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
      icon = element[0];
      return icon;
    }
  });

  return icon;
}

function cutLegend(legend) {
  if (legend.length < 25) return legend;

  return `${legend.substr(0, 20)}...`;
}

function Directory(props) {
  const { data } = props;
  const { authenticated } = useContext(Context);

  return data.length ? (
    <div className="directory">
      {data.map((dir, index) => {
        return dir.type === "file" ? (
          authenticated ? (
            <ContextMenu
              id={dir._id}
              filename={dir.title}
              width="100"
              key={dir._id}
              setDirUpdate={props.setDirUpdate}
            >
              <OptionLink
                image={chooseIcon(dir.format)}
                legend={cutLegend(dir.title)}
                width="100"
                title={dir.title}
                externalLink={dir.url}
              />
            </ContextMenu>
          ) : (
            <OptionLink
              image={chooseIcon(dir.format)}
              legend={cutLegend(dir.title)}
              key={dir._id}
              width="100"
              title={dir.title}
              externalLink={dir.url}
            />
          )
        ) : authenticated ? (
          <ContextMenu
            id={dir._id}
            filename={dir.title}
            width="100"
            key={dir._id}
            setDirUpdate={props.setDirUpdate}
          >
            <OptionLink
              image={folder_open}
              legend={cutLegend(dir.title)}
              width="100"
              folder
              parent={dir._id}
              func={props.func}
            />
          </ContextMenu>
        ) : (
          <OptionLink
            image={folder_open}
            legend={cutLegend(dir.title)}
            width="100"
            folder
            key={dir._id}
            parent={dir._id}
            func={props.func}
          />
        );
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
