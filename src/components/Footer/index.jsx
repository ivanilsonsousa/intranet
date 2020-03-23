import React from 'react'

import './styles.css'
import complexo from '../../assets/complexo.svg'

function Footer() {

  return(
        <div className="footer" >
            <img src={complexo} alt="Completo Santa Casa Sobral" style={{ height: "75px"}} />
            <h5>Complexo Santa Casa de Misericórida de Sobral</h5>
            <h6>Rua Antonio Crisóstomo de Melo 919, Centro</h6>
            <p>Sobral - Ceará, CEP: 62010-550</p>
            <span>Telefone: (88) 3112-0400</span> 
        <span className="w-100 pl-2" >&copy; { `Desenvolvido pela equipe de tecnolgia da informação 2020 - ${new Date().getFullYear()} `}</span>
        </div>
  )

}

export default Footer;