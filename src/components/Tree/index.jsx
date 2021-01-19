import React, { useEffect, useState } from "react";

import links from "./tree";

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
const render = item => {
  return Object.entries(item).map(([title, link]) =>
    Array.isArray(link) ? (
      <SubList title={title} items={link} key={`${title}-list`} />
    ) : (
      <Item title={title} link={link} key={`${title}-item-${link}`} />
    )
  );
};

// Final list component
const List = () => <div className="tree no-touch">{links.map(render)}</div>;

export default List;














































/*






function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" viewBox="10 10 1000 1000">
      <path
        fill="#666666"
        d="M857.1 842.7h-753.9c7.899999999999949-21.300000000000068 15.69999999999996-42.5 23.59999999999995-63.700000000000045 38.89999999999999-103.60000000000002 78.2-207.10000000000002 116.39999999999999-310.9 13.400000000000034-36.30000000000001 56.19999999999999-62.30000000000001 89.40000000000003-62.200000000000045 204.39999999999998 0.9000000000000341 408.79999999999995 0.7000000000000455 613.1999999999999 0.20000000000004547 23.100000000000023-0.10000000000002274 41 5.7999999999999545 51.60000000000002 27.5 2.6000000000000227 7.5 4.300000000000068 13.199999999999989 0 25.299999999999955-46.10000000000002 126.60000000000002-94.29999999999995 257.20000000000005-140.29999999999995 383.80000000000007z m-543.5-685.7c1 3 1.599999999999966 6.099999999999994 3 8.900000000000006 17.899999999999977 36 36 71.79999999999998 53.69999999999999 107.9 3 6.099999999999966 6.5 8.099999999999966 13.199999999999989 8.099999999999966 142.79999999999995-0.19999999999998863 285.70000000000005-0.19999999999998863 428.5-0.19999999999998863 29.299999999999955 0 55.10000000000002 21.80000000000001 60.200000000000045 50.900000000000034 0.599999999999909 3.3999999999999773 0 7 0 11.399999999999977h-11.900000000000091c-174 0-347.9-0.10000000000002274-521.9 0-60.89999999999998 0.10000000000002274-108.49999999999997 26.100000000000023-140.29999999999998 77.80000000000001-10.900000000000006 17.69999999999999-17.19999999999999 38.30000000000001-24.599999999999994 58-36.599999999999994 97.09999999999997-73 194.40000000000003-109.2 291.8-2.8999999999999986 7.7999999999999545-6.399999999999999 9.699999999999932-14.199999999999996 7.7999999999999545-24-6-47.7-25.399999999999977-50.1-47.799999999999955v-525.9000000000001c0-45.49999999999994 33.6-48.69999999999993 48.7-48.69999999999993h264.90000000000003z"
      />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props} viewBox="10 10 1000 1000">
      <path
        fill="#666666"
        d="M885.6 246.2h-327.70000000000005l-16.299999999999955-34.599999999999994c-13.399999999999977-28.400000000000006-40.10000000000002-46.29999999999998-69.10000000000002-46.29999999999998h-358c-28.700000000000003 0-52 25.69999999999999-52 57.29999999999998v555c0 31.600000000000023 23.299999999999997 57.299999999999955 52 57.299999999999955h771c28.700000000000045 0 52-25.699999999999932 52-57.299999999999955v-474.1c0.10000000000002274-31.600000000000023-23.200000000000045-57.30000000000001-51.89999999999998-57.30000000000001z"
      />
    </SvgIcon>
  );
}

function FileIcon(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      {...props}
      viewBox="10 10 900 1000"
    >
      <path
        fill="#555555"
        d="M900.1 254.1v1.0999999999999943l-229.60000000000002-229.6h0.6000000000000227l-25.100000000000023-24.999999999999993h-12c-4.7000000000000455-0.8000000000000014-9.200000000000045-0.8000000000000014-13.899999999999977-1.4432899320127035e-15h-423.1c-68.1 0-124 55.8-124 124.10000000000001v751.3c0 68.20000000000005 55.900000000000006 124 124 124h606.6c68.29999999999995 0 124.10000000000002-55.799999999999955 124.10000000000002-124.10000000000002v-594.3l-27.600000000000023-27.50000000000003z m-75.80000000000007 553.6999999999999c0 45.5-37.19999999999993 82.70000000000005-82.69999999999993 82.70000000000005h-482.5c-45.50000000000003 0-82.70000000000002-37.200000000000045-82.70000000000002-82.70000000000005v-615c0-45.49999999999994 37.19999999999999-82.69999999999996 82.70000000000002-82.69999999999996h227.5v149.00000000000003h-191.3c-22.69999999999999 0-41.30000000000001 18.599999999999966-41.30000000000001 41.299999999999955v37.900000000000034c0 22.69999999999999 18.69999999999999 41.39999999999998 41.30000000000001 41.39999999999998h197.2c7.100000000000023 12.5 20.200000000000045 21.5 35.60000000000002 21.5h296.4l-0.20000000000004547 406.59999999999997z m-198.89999999999998-496.99999999999994c-21.5 0-39.19999999999993-17.600000000000023-39.19999999999993-39.19999999999999v-206.8c0-4.6000000000000085 1.2999999999999545-8.800000000000011 2.699999999999932-12.900000000000013 1.8999999999999773 6.300000000000004 4.899999999999977 12.300000000000004 9.800000000000068 17.199999999999996l241.69999999999993 241.70000000000002h-215z m80 320.49999999999994h-410.09999999999997c-22.69999999999999 0-41.30000000000001 18.600000000000023-41.30000000000001 41.30000000000007v37.89999999999998c0 22.700000000000045 18.69999999999999 41.39999999999998 41.30000000000001 41.39999999999998h410.09999999999997c22.800000000000068 0 41.39999999999998-18.699999999999932 41.39999999999998-41.39999999999998v-37.89999999999998c0-22.700000000000045-18.699999999999932-41.30000000000007-41.39999999999998-41.30000000000007z m-451.5-144.69999999999993v37.89999999999998c2.842170943040401e-14 22.799999999999955 18.700000000000045 41.299999999999955 41.30000000000001 41.299999999999955h410.09999999999997c22.800000000000068 0 41.40000000000009-18.59999999999991 41.40000000000009-41.299999999999955v-37.89999999999998c0-22.80000000000001-18.700000000000045-41.400000000000034-41.40000000000009-41.400000000000034h-409.99999999999994c-22.69999999999999-0.0999999999999659-41.400000000000006 18.600000000000023-41.400000000000006 41.400000000000034z"
      />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});




// inicio

let tree = [
  { parent: "root", name: "A", id: 1 },
  { parent: "root", name: "B", id: 2 },
  { parent: "root", name: "C", id: 3 },
  { parent: "root", name: "D", id: 4 },
  { parent: "root", name: "E", id: 5 },
  { parent: 1, name: "Foto", id: 6, file: "http://local.." },
  { parent: 3, name: "Nova Pasta 2", id: 7 },
  { parent: 3, name: "Nova Pasta 3", id: 8 },
  { parent: 5, name: "Nova Pasta", id: 9 },
  { parent: 8, name: "Nova Pasta", id: 10 },
  { parent: 7, name: "Nova Pasta 8", id: 11 },
  { parent: 7, name: "Foto 2", id: 12, file: "http://local.." },
  { parent: 8, name: "Foto 3", id: 13, file: "http://local.." }
];



let parent = "root";
let historyParents = [];
let search = [];

function childOfParent(parent) {
  return tree.filter((e) => e.parent === parent && !e.isVisited);
}

function getLastParentHistory() {
  return historyParents[historyParents.length - 1];
}


function createTree(values) {
  values.forEach((element, index, array) => {
    // console.log("atual:", element.name, " -> ");
    search = childOfParent(parent);

    if (parent !== getLastParentHistory()) historyParents.push(parent);
    // console.log("historyParents: ", printHistory());
    console.log("parent: ", parent);
    console.log("childOfParent: \n", search);
    


    if (search.length === 0) {
      element.isVisited = true;
      console.log("Visitado: ", element.name);

      historyParents.pop();
      parent = getLastParentHistory();
    } else {
      parent = search[0].id;
    }

    // console.log("Entra -> ", getNameForID(parent)[0]);

    return <StyledTreeItem nodeId={element.id} label={element.name}>{createTree(search)}</StyledTreeItem>
    console.log("Index", index);

    // createTree(search); 

    console.log();
  });
}





























export default function CustomizedTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<FileIcon />}
    >


      <StyledTreeItem nodeId="1" label="Serviços de Apoio">
        
        <StyledTreeItem nodeId="2" label="Agência Transfusional" />

        <StyledTreeItem nodeId="3" label="CCIRAS">
          <StyledTreeItem nodeId="6" label="Hello" />

          <StyledTreeItem nodeId="7" label="Sub-subtree with children">
            <StyledTreeItem nodeId="9" label="Child 1" />
            <StyledTreeItem nodeId="10" label="Child 2" />
            <StyledTreeItem nodeId="11" label="Child 3" />
          </StyledTreeItem>

          <StyledTreeItem nodeId="8" label="Hello" />
        </StyledTreeItem>

        <StyledTreeItem nodeId="4" label="World" />

        <StyledTreeItem nodeId="5" label="Something something" />
      </StyledTreeItem>

      <StyledTreeItem nodeId="12" label="Teste">
        <StyledTreeItem nodeId="13" label="Agência Transfusional">
          <StyledTreeItem
            nodeId="14"
            label="Agência Transfusional"
            onLabelClick={() =>
              window.open(
                "http://10.10.10.5/intranet/wp-content/uploads/2020/07/Coleta-de-amostras-para-testes-pr%C3%A9-transfusionais.pdf",
                "_blank"
              )
            }
          />
        </StyledTreeItem>
      </StyledTreeItem>

      <StyledTreeItem nodeId="16" label="Teste"></StyledTreeItem>

    </TreeView>
  );
}

*/