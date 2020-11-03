import React, { useEffect, useState } from "react";

import { capitalize } from "../../scripts/utils";
import man from "../../assets/masculino.svg";
import woman from "../../assets/feminino.svg";
import api from "../../services/api";
import "./styles.css";

function Pearsons({ person }) {
  return (
    <div className="person" title={person.nome}>
      <img
        src={person.sexo === "M" ? man : woman}
        style={{ width: "55px" }}
        alt="Avatar"
      />
      <div>
        <span>{capitalize(`${person.nome} - ${person.cargo}`)}</span>
        <h6>{person.setor}</h6>
      </div>
    </div>
  );
}

function ListBirthdays() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/birthdays");

      setPersons(data);
    })();
  }, []);

  return (
    <div className="list-birthdays">
      {persons.map((person, index) => (
        <Pearsons key={index} person={person} />
      ))}
    </div>
  );
}

export default ListBirthdays;
