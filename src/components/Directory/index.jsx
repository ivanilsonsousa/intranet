import React from 'react'
import ContextMenu from '../ContextMenu'
import OptionLink from '../OptionLink'
import './styles.css'

import folder_open from '../../assets/folder_new.svg'
import iconPDF from '../../assets/pdf_new.svg'
import iconJPG from '../../assets/jpg.svg'
import iconWORD from '../../assets/word.svg'
import iconEXCEL from '../../assets/excel_new.svg'
import iconSLIDE from '../../assets/powerpoint.svg'
import iconVIDEO from '../../assets//video.svg'
import iconDefault from '../../assets/file.svg'

import empty from '../../assets/empty.svg'

function chooseIcon(format = '') {
  let icon = iconDefault
  const valuesPDF = [ iconPDF, '.pdf']
  const valuesVIDEO = [ iconVIDEO, '.mp4']
  const valuesJPG = [iconJPG, '.jpeg', '.jpg', '.jij', '.png']
  const valuesWORD = [iconWORD, '.doc', '.docx']
  const valuesEXCEL = [iconEXCEL, '.xls', '.xlsx', '.slk']
  const valuesSLIDE = [iconSLIDE, '.ppt', '.pptx']

  const formats = [valuesPDF, valuesWORD, valuesSLIDE, valuesJPG, valuesEXCEL, valuesVIDEO]

  formats.forEach(element => {
    if(element.includes(format)) {
      icon = element[0]
      return icon
    }
  })

  return icon
}

function cutLegend(legend) {
  if(legend.length < 25)
    return legend

  const ext = legend.split('.').pop()
  return `${legend.substr(0, 20)}...${ext}`
}

function Directory(props) {
  const { data } = props

  return data.length ? 
        <div className="row mb-3">
          {data.map((dir, index) => {
            return dir.type === 'file' ?
              <ContextMenu id={dir._id} filename={dir.file} width="25" key={dir._id} setDirUpdate={props.setDirUpdate} >
                <OptionLink image={ chooseIcon(dir.format) } legend={cutLegend(dir.file)} width="100" title={dir.file} externalLink={dir.file_url} />
              </ContextMenu>
              :
              <ContextMenu id={dir._id} width="25" key={dir._id} setDirUpdate={props.setDirUpdate} >
                <OptionLink image={folder_open} legend={dir.title} width="100" folder parent={dir._id} func={props.func} />
              </ContextMenu>
          })}
        </div>
        :
        <div className="container d-flex flex-column h-100 align-items-center justify-content-center pt-5 no-touch">
          <img src={empty} alt="Pasta Vazia" style={{ height: "55px"}}/>
          <span className="mt-3">Essa pasta está vazia.</span>
        </div> 
}

export default Directory;