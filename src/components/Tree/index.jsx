import React, { useEffect, useState } from "react";

import api from "../../services/api";
import './styles.css'

// Each list item
const Item = ({ link, title }) => (
  <dd>
    <a href={link} target="__blank"><i className="far fa-file-pdf" /> {title}</a>
  </dd>
);

// Sublit component
function SubList ({ title, items }) {
  const [open, setOpen] = useState(true);
  const [isVoid, setIsVoid] = useState(false);

  useEffect(() => {
    setIsVoid(items.length === 0 ? true : false);
  }, [])

  return (
  <ol className={`${open ? 'expanded' : 'contracted'}`}>
    <span 
    onClick={() => setOpen(!open)}
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
    <SubList title={item.title} items={item.childs} key={`${item.title}-list`} />
  ) : (
    <Item title={item.title} link={item.file} key={`${item.title}-item-${item.file}`} />
  )
};

// Final list component
function List() {
  const [pops, setPops] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await api.get('/pops-tree');

      let treeMenu = response.data;

      function LoopObjTree( parent ) {
        var treeMenuTemp = [];
      
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
      
      setPops(tree);
    })()
  }, [])

  return (
    <div className="tree no-touch">{pops.map(render)}</div>
  );
}


export default List;