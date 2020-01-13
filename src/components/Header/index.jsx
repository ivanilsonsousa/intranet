import React, { Component } from 'react'
// import localIpV4Address from 'local-ipv4-address'
import logo from '../../assets/logo-intranet.svg'

import './styles.css'
import ip from 'ip'

var localIpV4Address = require("local-ipv4-address");

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ip: ip.address()
        }
    }

    componentDidMount() {
        // this.setState({ ip: "teste" })
        localIpV4Address()
            .then(ipAddress => {this.setState({ ip: 'hh' }) })

            localIpV4Address().then(function(ipAddress){
                console.log("My IP address is " + ipAddress);
                // My IP address is 10.4.4.137
            });
    }

    render() {
        return (
            <>  
                <div className="sub-header d-flex bg-light px-3 align-items-center">
                    <img src={logo} style={{ height: "60px" }} />
                    <div className="row d-flex justify-content-sm-between align-items-sm-center w-100 px-sm-5 justify-content-end pr-2 pr-sm-0">
                        <h1 className="display-4 m-0">Intranet</h1>
                        <div className="meu-ip">{`Meu ip é ${this.state.ip}`}</div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark color-default p-0">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse pl-2" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#"> Home <span className="sr-only">(current)</span></a>
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
                            <a className="nav-link" href="#"> TI</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Marketing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Projetos DEPE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> Documentos</a>
                        </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}


// function Header() {
//     let [ip, setIp] = useState('127.0.0.1');
    
//     localIpV4Address().then(ipAddress => setIp(ipAddress))

//     return (
//         <>  
//             <div className="sub-header d-flex bg-light px-3 align-items-center">
//                 <img src={logo} style={{ height: "60px" }} />
//                 <h1 className="ml-3 display-4">Intranet</h1>
                
//                 <div className="meu-ip">{`Meu ip é ${ip}`}</div>
//             </div>
//             <nav className="navbar navbar-expand-lg navbar-dark color-default p-0">
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav mr-auto">
//                     <li className="nav-item active">
//                         <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Empresa</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Departamentos</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Gestão de Pessoas</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">TI</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Marketing</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Projetos DEPE</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Documentos</a>
//                     </li>
//                     </ul>
//                 </div>
//             </nav>
//         </>
//     )

// }

// export default Header