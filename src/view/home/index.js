import React from 'react'
import Header from '../../components/Header'
import Carousel from '../../components/Carousel'
import OptionLink from '../../components/OptionLink'
import Callout from '../../components/Callout'

import picture from '../../assets/picture.svg'
import cinema from '../../assets/cinema.svg'
import users from '../../assets/users.svg'
import fones from '../../assets/call.svg'
import file from '../../assets/file.svg'
import folder from '../../assets/folder.svg'
import computer from '../../assets/computer.svg'

import './style.css'

function Home() {
  const decoration = {
    color: 'whiteSmoke',
    width:'33.333%'
  }

  return (
    <>
      <Header/>
      <div className="container-lg content-body p-2 pt-4 m-0">
        <div className="container">
          <div className="row mb-4">
            <div className="col-sm-6">
              <Carousel/>
            </div>
            <div className="col-sm-6">
              <h1 className="display-4 title-display">Utilidades</h1>
              
              <div className="row mb-3">
                <OptionLink className="bg" image={picture} legend="Galeria de Fotos"/>
                <OptionLink className="bg" image={cinema} legend="Vídeos"/>
                <OptionLink className="bg" image={users} legend="Pessoas"/>
                <OptionLink className="bg" image={fones} legend="Lista de Ramais"/>
              </div>

              <div className="row">
                <OptionLink className="bg" image={picture} legend="Titulo"/>
                <OptionLink className="bg" image={picture} legend="Titulo"/>
                <OptionLink className="bg" image={picture} legend="Titulo"/>
                <OptionLink className="bg" image={picture} legend="Titulo"/>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 ">
              <h1 className="display-4 title-display">Comunicados</h1>
              <Callout className="callout-primary" title="Semana Pró-Sangue" description="Acompanhe o cronograma de doação." date="11/01/2020" />
              <Callout className="callout-secundary" title="Campanha de Vacinação" description="Se cuide, e cuide do outro." date="08/01/2020" />
              <Callout className="callout-info" title="Cursos de extensão" description="Se prepare, vamos todos juntos nessa." date="05/01/2020" />
            </div>

            <div className="col-sm-6">
              <h1 className="display-4 title-display mb-4">Acesse</h1>

              <div className="row mb-3 d-flex">
                <OptionLink 
                  image={file} 
                  legend="POPs" 
                  decorations={{ backgroundColor: "DarkSlateGray", ...decoration }}
                />
                <OptionLink 
                  image={folder} 
                  legend="Documentos" 
                  decorations={{ backgroundColor: "SteelBlue", ...decoration }}
                />
                <OptionLink 
                  image={computer} 
                  legend="Sistemas" 
                  decorations={{ backgroundColor: "DarkSlateBlue", ...decoration }}
                />
              </div>
              
              <h1 className="display-4 title-display mb-4">Previsão do Tempo</h1>
              <div className="row">
                hhfjdhd<br/>
                hhfjdhd<br/>
                hhfjdhd<br/>
                hhfjdhd<br/>
              </div>
                

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;