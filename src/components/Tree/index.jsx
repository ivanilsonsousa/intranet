import React, { useEffect, useState, useContext, memo } from "react";

import { Context } from "../../Context/AuthContext";
import { PopsContext } from "../../pages/Pops";

import './styles.css'

// Each list item
const Item = ({ link, title, item }) => {
  const [selected, setSelected] = useState(false);
  const { setItemSelect } = useContext(PopsContext);
  const { authenticated } = useContext(Context);

  function handleClick() {
    setItemSelect(setSelected, item);
  }

  return (
  <dd>
    { authenticated ?

    <span
      className={`${selected && 'select-item'} end-right`}
      onClick={handleClick}
    >
      <i className="fas fa-external-link-alt end-right" onClick={() => window.open(link, '_blank') } /> {title}
    </span>

    :

    <a 
      href={link} 
      target="__blank"
      className={`${selected && 'select-item'}`}
      onClick={handleClick}
    >
      <i className="far fa-file-pdf" /> {title}
    </a> }
  </dd>
  )
};

// Sublit component
function SubList ({ title, items, item }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const { setItemSelect } = useContext(PopsContext);
  const [isVoid, setIsVoid] = useState(false);
  const { handleReseteItemSelect } = useContext(PopsContext);

  function handleClick() {
    setOpen(!open);
    setItemSelect(setSelected, item);
  }

  useEffect(() => {
    setIsVoid(items.length === 0 ? true : false);
  }, [item])

  return (
  <ol className={`${open ? 'expanded' : 'contracted'}`} onClick={(e) => handleReseteItemSelect(e)} >
    <span 
    onClick={handleClick}
    className={`${selected && 'select-item'}`}
    >
      <i className={`${isVoid ? 'far' : 'fas'} fa-folder${open ? '-open' : ''}`} /> {title}
    </span>

    <li>
      {items.map(render)}
    </li>
  </ol>
  );
};

// Recursively renders list
const render = (item) => {

  return item.childs ? (
    <SubList title={item.title} item={item} items={item.childs} key={`${item._id}-list`} />
  ) : (
    <Item title={item.title} item={item} link={item.file_url} key={`${item._id}-list`} />
  )
};

// Final list component
function List({ response }) {
  const [pops, setPops] = useState([]);

  useEffect(() => {
    (async () => {
      let treeMenu = response;

      function LoopObjTree( parent ) {
        let treeMenuTemp = [];
      
        for( var i in treeMenu ) {
      
          if(( parent === undefined && treeMenu[i].parent === "root") || (treeMenu[i].parent === parent )) {
      
            if(treeMenu[i].type === 'folder') {
              treeMenu[i].childs = LoopObjTree(
                treeMenu[i]._id
              );
            }
          
            treeMenuTemp.push(
              treeMenu[i]
            );
          } 
      
        }
        
        return treeMenuTemp;
      }

      let tree = LoopObjTree();

      setPops(tree);
    })()
  }, [response])

  return (
    <div className="tree no-touch" >{pops.map(render)}</div>
  );
}

export default memo(List);