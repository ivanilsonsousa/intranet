import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import logo from "../../assets/logo-branca.svg";
import "./styles.css";

function Company() {
  return (
    <>
      <Header flag="Empresa" />
      <div className="container-fluid d-flex company content-body p-5 justify-content-center px-sm-0 px-md-0" >
        <div className="col-4 d-flex align-items-center justify-content-center content-logo-white">
          <img src={logo} style={{ height: "180px" }} alt="logo" />
        </div>
        <div className="col-5 pl-5 wrapper-company">
          <div className="detail-company">
            <hr className="hr" />
            <h1 className="display-4">Missão</h1>
            <p>
              Prestar assistência e formação em saúde com alto padrão de
              qualidade, humanização, segurança e sustentabilidade.
            </p>
          </div>
          <div className="detail-company">
            <hr className="hr" />
            <h1 className="display-4">Visão</h1>
            <p>
              Ser reconhecida nacionalmente como padrão de excelência em
              assistência, gestão e ensino em saúde.
            </p>
          </div>
          <div className="detail-company w-100">  
            <hr className="hr" />
            <h1 className="display-4">Valores</h1>
              – Ética como princípio fundamental<br/>
              – Humanização é nosso dever<br/>
              – Transparência é nossa obrigação<br/>
              – Excelência e qualidade em tudo que fazemos
          </div>
          <div className="detail-company">
            <hr className="hr" />
            <h1 className="display-4">Manifesto</h1>
            <p>
              Nascemos de ideais cristãos. Trabalhamos com cuidado, com amor, com
              a vontade de fazer o bem. Somos todos Santa Casa de Sobral e juntos
              vamos ajudar as pessoas com força, fé e compaixão!
            </p>
            <hr className="hr" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Company;
