import React from "react";
import Header from "../../components/Header";
import Option from "../../components/Option";

import dashboard_icon from "../../assets/dashboard.svg";
import airplane_icon from "../../assets/origami.svg";
import phone_icon from "../../assets/phone.svg";
import photo_icon from "../../assets/photo.svg";
import video_icon from "../../assets/cinema.svg";
import group_icon from "../../assets/group.svg";
import logo from "../../assets/logo-dashboard.svg";
import "./styles.css";

import post_icon from "../../assets/post.svg";

export default function DashBoad() {

  return (
    <>
      <Header flag="TI" />
      <div className="container">
        <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            {" "}
            <img
              src={dashboard_icon}
              style={{ width: "45px" }}
              alt="DashBoard"
            />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Painel de configurações
            </h3>
          </div>
        </div>
        <hr className="my"></hr>
        <div
          className="container content-dashboard"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <Option
            image={group_icon}
            legend="Usuários"
            to="/dashboard/users"
            backgroundColor="#3C52B4"
          />
          <Option
            image={post_icon}
            legend="Posts"
            width="50"
            to="/dashboard/posts"
            backgroundColor="#FF8556"
          />
          <Option
            image={airplane_icon}
            legend="Comunicados"
            to="dashboard/notices"
            backgroundColor="#FEC05C"
          />
          <Option
            image={phone_icon}
            legend="Lista de ramais"
            to="dashboard/fones"
            backgroundColor="#0063b4"
          />
          <Option
            image={photo_icon}
            legend="Fotos"
            to="/dashboard/photos"
            backgroundColor="#A3D98C"
          />
          <Option
            image={video_icon}
            legend="Vídeos"
            to="/dashboard/videos"
            backgroundColor="#A3D98C"
          />
        </div>
      </div>
    </>
  );
}
