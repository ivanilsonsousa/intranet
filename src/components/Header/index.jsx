import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import logo from '../../assets/logo-intranet.svg'

import './styles.css'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ip: ''
        }

        api.get('/meu-ip')
            .then(res => this.setState({ ip: res.data.ip }))
            .catch(err => this.setState({ ip: 'Erro' }))
    }

    render() {
        return (
            <>  
                <div className="sub-header d-flex bg-light px-3 align-items-center">
                    <Link to="/">
                        <img src={logo} style={{ height: "60px" }} alt="logo" />                
                    </Link>
                    <div className="row d-flex justify-content-sm-between align-items-sm-center w-100 px-sm-5 justify-content-end pr-2 pr-sm-0">
                        <h1 className="display-4 m-0">Intranet</h1>
                        <div className="meu-ip">{`Meu IP é ${this.state.ip}`}</div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark color-default p-0">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse pl-2" id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Empresa</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Departamentos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Gestão de Pessoas</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login"> TI</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Marketing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Projetos DEPE</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/documents"> Documentos</Link>
                        </li>
                      </ul>
                    </div>
                </nav>
            </>
        )
    }
}