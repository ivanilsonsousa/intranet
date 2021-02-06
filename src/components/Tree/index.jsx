import React, { useEffect, useState, useContext, memo } from "react";

import { PopsContext } from "../../pages/Pops";

import './styles.css'

// Each list item
const Item = ({ link, title, item }) => {
  const [selected, setSelected] = useState(false);
  const { setItemSelect, setValueCurrent } = useContext(PopsContext);

  function handleClick() {
    setItemSelect(setSelected, item);
    // setValueCurrent(item);
  }

  return (
  <dd>
    <a 
      href={link} 
      target="__blank"
      className={`${selected && 'select-item'}`}
      onClick={handleClick}
    >
      <i className="far fa-file-pdf" /> {title}
    </a>
  </dd>
  )
};

// Sublit component
function SubList ({ title, items, item }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(false);
  const { setItemSelect } = useContext(PopsContext);
  const [isVoid, setIsVoid] = useState(false);

  function handleClick() {
    setOpen(!open);
    setItemSelect(setSelected, item);
    // setValueCurrent(item);
    // console.log(item);
  }

  useEffect(() => {
    setIsVoid(items.length === 0 ? true : false);
  }, [])

  return (
  <ol className={`${open ? 'expanded' : 'contracted'}`}>
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
    <SubList title={item.title} item={item} items={item.childs} key={`${item.title}-list`} />
  ) : (
    <Item title={item.title} item={item} link={item.file} key={`${item.title}-item-${item.file}`} />
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

      var tree = LoopObjTree();
      
      console.log(tree);

      setPops(tree);
    })()
  }, [response])

  return (
    <div className="tree no-touch">{pops.map(render)}</div>
  );
}


export default memo(List);