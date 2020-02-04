import React from 'react'
import OptionLink from '../OptionLink'
import './styles.css'

import folder_open from '../../assets/folder_new.svg'
import iconPDF from '../../assets/pdf_new.svg'
import iconJPG from '../../assets/jpg.svg'
import iconWORD from '../../assets/word.svg'
import iconEXCEL from '../../assets/excel_new.svg'
import iconSLIDE from '../../assets/powerpoint.svg'
import iconDefault from '../../assets/file.svg'


import empty from '../../assets/empty.svg'


function chooseIcon(format = '') {
  let icon = iconDefault
  const valuesPDF = [ iconPDF, '.pdf']
  const valuesJPG = [iconJPG, '.jpeg', '.jpg', '.jij', '.png']
  const valuesWORD = [iconWORD, '.doc', '.docx']
  const valuesEXCEL = [iconEXCEL, '.xls', '.xlsx']
  const valuesSLIDE = [iconSLIDE, '.ppt']

  const formats = [valuesPDF, valuesWORD, valuesSLIDE, valuesJPG, valuesEXCEL]

  formats.forEach((element) => {
    if(element.includes(format)) 
      return icon = element[0]
  })

  return icon
}

function cutLegend(legend) {
  console.log(legend.length)
  if(legend.length < 25)
    return legend

  const ext = legend.split('.').pop()
  return `${legend.substr(0, 20)}...${ext}`
}

function Directory(props) {
  const { data } = props

  return data.length ? 
        <div className="row mb-3">
          {data.map((dir,index) => {
            return dir.type == 'file' ?
              <OptionLink key={index} image={ chooseIcon(dir.format) } legend={cutLegend(dir.file)} title={dir.file} externalLink={dir.file_url} /> 
              :
              <OptionLink key={index} image={folder_open} legend={dir.title} folder parent={dir._id} func={props.func} />
          })}
        </div>
        :
        <div className="container d-flex flex-column h-100 align-items-center justify-content-center pt-5 no-touch">
          <img src={empty} alt="Pasta Vazia" style={{ height: "55px"}}/>
          <span className="mt-3">Essa pasta está vazia.</span>
        </div> 
}

export default Directory;