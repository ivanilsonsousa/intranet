import React from 'react'

import Header from '../../components/Header'
import Carousel from '../../components/Carousel'
import OptionLink from '../../components/OptionLink'
import Callout from '../../components/Callout'

import picture from '../../assets/picture.svg'
import art from '../../assets/art.svg'
import cinema from '../../assets/cinema.svg'
import video from '../../assets/video-cameras.svg'
import users from '../../assets/users.svg'
import group from '../../assets/peoples.svg'
import fones from '../../assets/call.svg'
import fone from '../../assets/fones.svg'
import file from '../../assets/file.svg'
import folder from '../../assets/folder.svg'
import computer from '../../assets/computer.svg'
import mv from '../../assets/mv-indicadores.svg'
import sigtap from '../../assets/sigtap.svg'
import upToDate from '../../assets/upToDate.svg'
import clock from '../../assets/clock.svg'

import './style.css'

function Home() {
  const width = '33.33333'

  return (
    <>
      <Header/>
      <div className="container-lg content-body p-2 pt-4 m-0">
        <div className="container-md px-md-5 mx-md-5">
          <div className="row mb-4">
            <div className="col-sm-6">
              <Carousel/>
            </div>
            <div className="col-sm-6">
              <h1 className="display-4 title-display">Utilidades</h1>
              
              <div className="row mb-3">
                <OptionLink image={art} legend="Galeria de Fotos" to="gallery" />
                <OptionLink image={video} legend="Vídeos" to="videos" />
                <OptionLink image={group} legend="Pessoas" to="persons" />
                <OptionLink image={fone} legend="Lista de Ramais" to="fones"/>
              </div>

              <div className="row">
                <OptionLink image={mv} legend="MV Indicadores" externalLink="http://10.10.10.211/Painel_PRD/" />
                <OptionLink image={sigtap} legend="SigTap Web" externalLink="http://sigtap.datasus.gov.br/tabela-unificada/app/sec/inicio.jsp" />
                <OptionLink image={upToDate} legend="UpToDate" externalLink="https://www.uptodate.com/contents/search" />
                <OptionLink image={clock} legend="Atividades"to="activities" />
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
                  width={width}
                  to="pops"
                  backgroundColor="DarkSlateGray"
                />
                <OptionLink 
                  image={folder} 
                  legend="Documentos" 
                  width={width}
                  to="documents"
                  backgroundColor="SteelBlue"
                />
                <OptionLink 
                  image={computer}
                  legend="Sistemas"
                  width={width}
                  externalLink="http://10.10.10.4/wsp/"
                  backgroundColor="DarkSlateBlue"
                />
              </div>
              
              <h1 className="display-4 title-display mb-4">Aniversariantes</h1>
              <div className="row">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              </div>
                

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;