import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Container, Content, HeaderDescription } from "../../components/Layout";
import Footer from "../../components/Footer";
import NotFound from "../../components/NotFound";
import Search from "../../components/Search";

import { ClipLoader as Spinner } from "react-spinners";

import fone from "../../assets/phone.svg";
import api from "../../services/api";

function Phones() {
  const [phones, setPhones] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/phones-list?query=${query}`)
      .then((res) => {
        setPhones(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  return (
    <>
      <Header />
      <div className="container content-body">
        {/* <div className="container-fluid d-flex align-items-baseline w-100">
          <div className="d-flex align-items-end pl-2 pt-5">
            <img src={fone} style={{ width: "50px" }} alt="Posts" />
            <h3 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">
              Lista de Ramais
            </h3>
          </div> */}
          <HeaderDescription icon={fone} title="Lista de Ramais" iconTam="50" className="d-flex align-items-end pl-2 pt-5" >
            <Search className="ml-auto" onChange={setQuery} />
          </HeaderDescription>
        {/* </div> */}
        <hr className="my"></hr>
        <div className="container py-5">
          {loading ?
            <div className="d-flex align-items-center justify-content-center">
              <Spinner sizeUnit="px" size={35} color="#4d6d6d" />
            </div>
            :
           phones.length ? (
            phones.map((phone) => {
              return (
                <div className={`post secundary`} key={phone._id}>
                  <div className="d-flex space-between w-100">
                    <div className="w-100">
                      <h5 className="title-phone">
                        <i className="fas fa-phone-alt mr-2" />
                        <i>{phone.title}</i>
                      </h5>
                      <span className="description-phone ml-4">
                        <strong> {phone.description}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NotFound />
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Phones;
