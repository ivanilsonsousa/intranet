import React from "react";

import "./styles.css";
import complexo from "../../assets/complexo.svg";

function Footer() {
  return (
    <div className="footer">
      <img
        src={complexo}
        alt="Completo Santa Casa Sobral"
        style={{ height: "75px" }}
        className="no-touch"
      />
      <h5 className="text-center">
        Complexo Santa Casa de Misericórdia de Sobral
      </h5>
      <h6>Rua Antonio Crisóstomo de Melo 919, Centro</h6>
      <span>Sobral - Ceará, CEP: 62010-550</span>
      <span>Telefone: (88) 3112-0400</span>
      <span className="text-center">
        &copy;
        {` Desenvolvido pela equipe de Tecnologia da Informação 2020 - ${new Date().getFullYear()} `}
      </span>
    </div>
  );
}

export default Footer;
