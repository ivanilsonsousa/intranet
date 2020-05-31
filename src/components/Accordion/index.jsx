import React from "react";

import './styles.css'

function Accordion(props) {

  return(
    <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
      {props.children}
    </div>
  )
}

function AccordionCard(props) {

  return(
    <div className="card">
      <div className="card-header" role="tab" id="headingOne1">
            <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
            aria-controls="collapseOne1">
            <h5 className="mb-0">
              SESMT <i className="fas fa-angle-down rotate-icon float-right"/>
            </h5>
          </a>
        </div>

      <div id={props.id} className="collapse" role="tabpanel" aria-labelledby={props.id} data-parent="#accordionEx">
        <div className="card-body">
          <ul>
            {props.children}
          </ul>
        </div>
      </div>
    </div>
  )
}

function AccordionItem(props) {
  
  return(
    <li><i class="fas fa-external-link-alt mr-2"/><a href="#" aria-describedby="link01-02">Acompanhamento de acidente de trajeto</a></li>
  )
}

// function AccordionA(props) {

//   return (
//     <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
    
      
//         <div className="card-header" role="tab" id="headingOne1">
//           <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
//             aria-controls="collapseOne1">
//             <h5 className="mb-0">
//               SESMT <i className="fas fa-angle-down rotate-icon float-right"/>
//             </h5>
//           </a>
//         </div>
    
//         <div id="collapseOne1" className="collapse show" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
//           <div className="card-body">
//             <ul>
//               <li><i class="fas fa-external-link-alt mr-2"/><a href="#" aria-describedby="link01-01">Acompanhamento de acidente com material biológico.</a></li>
//               <li><i class="fas fa-external-link-alt mr-2"/><a href="#" aria-describedby="link01-02">Acompanhamento de acidente de trajeto</a></li>
//               <li><i class="fas fa-external-link-alt mr-2"/><a href="#" aria-describedby="link01-03">Acompanhamento de acidente típico</a></li>
//               <li><i class="fas fa-external-link-alt mr-2"/><a href="#" aria-describedby="link01-03">Higienização de panelas, caçaloras, frigideiras e cuscuzeiras</a></li>
//             </ul>
//           </div>
//         </div>
    
//       </div>
    
//       <div className="card">
    
//         <div className="card-header" role="tab" id="headingTwo2">
//           <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseTwo2"
//             aria-expanded="false" aria-controls="collapseTwo2">
//             <h5 className="mb-0">
//               Comissões <i className="fas fa-angle-down rotate-icon float-right"></i>
//             </h5>
//           </a>
//         </div>
    
//         <div id="collapseTwo2" className="collapse" role="tabpanel" aria-labelledby="headingTwo2" data-parent="#accordionEx">
//           <div className="card-body">
//             Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
//             wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
//             eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
//             assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
//             nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
//             farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
//             labore sustainable VHS.
//           </div>
//         </div>
    
//       </div>
    
//       <div className="card">
    
//         <div className="card-header" role="tab" id="headingThree3">
//           <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree3"
//             aria-expanded="false" aria-controls="collapseThree3">
//             <h5 className="mb-0">
//               Laboratorio <i className="fas fa-angle-down rotate-icon float-right"></i>
//             </h5>
//           </a>
//         </div>
    
//         <div id="collapseThree3" className="collapse" role="tabpanel" aria-labelledby="headingThree3" data-parent="#accordionEx">
//           <div className="card-body">
//             Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
//             wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
//             eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
//             assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
//             nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
//             farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
//             labore sustainable VHS.
//           </div>
//         </div>
    
//       </div>
    
//     </div>
//   );
// }

export default Accordion;

export { AccordionCard, AccordionItem };
