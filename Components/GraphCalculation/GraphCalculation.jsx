import styles from "./graphCalculation.module.scss";
import React, { useContext } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { DataContext } from "../../pages";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

const GraphCalculation = () => {
  //read values out of React Context
  const [values] = useContext(DataContext);
  
  //data object for intializing data for nodes to draw in graph
  const dataFactoryNodes = () => {
    return {
      data: {
        id: "",
        name: "",
        shape: "",
        bordercolor: "",
        parent: "",
      },
    };
  };

  //data object for intializing data for edges to draw in graph
  const dataFactoryEdges = () => {
    return {
      data: {
        id: "",
        name: "",
        source: "",
        target: "",
        color: "",
      },
    };
  };

  const createMallocBlockStackGraphData = (name, color, elements) => {
    //datapoints for outer rectangle
    const mallocstack = dataFactoryNodes();
    mallocstack.data.id = "n1";
    mallocstack.data.name = `malloc_block_stack(${name})`;
    mallocstack.data.shape = "rectangle";
    mallocstack.data.bordercolor = color;

    //datapoints for inner rectangle
    const stack = dataFactoryNodes();
    stack.data.id = "n2";
    stack.data.name = `${name}:stack`;
    stack.data.shape = "rectangle";
    stack.data.bordercolor = color;
    stack.data.parent = "n1";
    //push datapoints in an elements array with name nodes
    elements.nodes.push(mallocstack);
    elements.nodes.push(stack);
  };

  const createMallocBlockNodeGraphData = (name, color, elements) => {
    const mallocNode = dataFactoryNodes();
    mallocNode.data.id = "n3";
    mallocNode.data.name = `malloc_block_node(${name})`;
    mallocNode.data.shape = "rectangle";
    mallocNode.data.bordercolor = color;

    const node = dataFactoryNodes();
    node.data.id = "n4";
    node.data.name = `${name}:node`;
    node.data.shape = "rectangle";
    node.data.bordercolor = color;
    node.data.parent = "n3";

    elements.nodes.push(mallocNode);
    elements.nodes.push(node);
  };

  //pull out entered name of heap chunk by the user to later determine label in graph and call create-Function to satisfy the different types of heap chunks
  const checkTypeOfHeapChunk = (value, elements) => {
    if (value.textInput.startsWith("malloc_block_stack")) {
      const name = value.textInput.substring(19, 20);
      const color = value.radioButtonColor;
      createMallocBlockStackGraphData(name, color, elements);
    } else if (value.textInput.startsWith("malloc_block_node")) {
      const name = text.substring(18, 19);
      const color = value.radioButtonColor;
      createMallocBlockNodeGraphData(name, color, elements);
    }
    //else if textinput startswith malloc_block_node
    //else if textinput starts with node
    //else if textinput starts with stack
  };

  const style = [
    {
      selector: "node",
      css: {
        content: "data(name)",
        "text-valign": "center",
        "text-halign": "center",
        shape: "data(shape)",
        "border-color": "data(bordercolor)",
        "border-width": "3",
        padding: "20",
      },
    },
    {
      selector: ":parent",
      css: {
        "text-valign": "top",
        "text-halign": "center",
      },
    },
    {
      selector: "edge",
      css: {
        content: "data(name)",
        "text-margin-y": -17,
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        "line-color": "data(color)",
      },
    },
  ];

  const layout = { name: "dagre" };
  const elementsForGraphArray = [];
  const drawGraph = () => {
    //holds the graph data objects without nodes and edges grouping
    //like so: {data: {id: 'one', name:'lala' ...}}, {data: {id: 'two, source: 'one', target: 'x'}}
    const elementsFlat = [];

    //holds the data points grouped by nodes and edges = not flattened
    const elements = {
      nodes: [],
      edges: [],
    };
    values.map((value) => checkTypeOfHeapChunk(value, elements));

    //when clicked flaten the array and push in elementsFlat
    elements.nodes.forEach((x) => elementsFlat.push(x));

    //pass to global Array variable
    elementsForGraphArray = elementsFlat;
    console.log(elementsForGraphArray);
  };
  //Problem vermutlich: Cytoscape Component wird nicht neu gerendert wenn Button "Draw State" geklickt wird. values state ändert sich auch vorher schon aber ich will, dass der state mit mehreren Zeilen/ items gefüllt werden kann und erst processed und gerendert wird, wenn draw state gedrückt wird -> vielleicht einen internen state
  return (
    <div>
      <button onClick={drawGraph}>Draw state</button>

      <CytoscapeComponent
        elements={elementsForGraphArray}
        stylesheet={style}
        style={{ width: "600px", height: "600px" }}
        layout={layout}
      />
    </div>
  );
};
export default GraphCalculation;

/* 
Entwurf
  1. malloc, stack oder node ?
    1.1 malloc: malloc_block_stack oder malloc_block_node?
      1.1.1 malloc_block_stack: store the string out of () in variable name
              create malloc_block_stack(x)
                generateNodeId() -> fortlaufend: const id = Date.now();
                createNode(name)
                {data: {id: 'auto', name: 'malloc_block_stack(x), shape: 'rectangle', bordercolor: 'color'}},
                {data: {id: 'auto', name: 'x:stack', shape: 'rectangle', bordercolor: 'color', parent: 'id-1'}}
      1.1.2. malloc_block_node: store the string out of ()
              create malloc_block_node(x)
        
  */
//auswerten der Daten
//bauen des elements Objects
//style property for CytoscapeComponent
