import styles from "./graphCalculation.module.scss";
import React, { useContext, useState } from "react";
import { DataContext } from "../../pages/graph";
import Graph from "../Graph/Graph";

const GraphCalculation = () => {
  //holds the data points grouped by nodes and edges = not flattened
  const elementsJSON = {
    nodes: [],
    edges: [],
  };

  //holds the graph data objects without nodes and edges grouping
  //like so: {data: {id: 'one', name:'lala' ...}}, {data: {id: 'two, source: 'one', target: 'x'}}
  const elementsFlat = [];

  //read values out of React Context
  const [values] = useContext(DataContext);

  //state to update Cytoscape Component by Click on Button
  const [graphData, setGraphData] = useState([]);

  const handleClick = () => {
    setGraphData([...fillElementsArray()]);
  };

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

  //function to generate data points according to malloc_block_stack statement
  const createMallocBlockStackGraphData = (name, color) => {
    //datapoints for outer rectangle
    const mallocstack = dataFactoryNodes();
    mallocstack.data.id = `${name}`;
    mallocstack.data.name = `malloc_block_stack(${name})`;
    mallocstack.data.shape = "rectangle";
    mallocstack.data.bordercolor = color;

    //datapoints for inner rectangle
    const stack = dataFactoryNodes();
    stack.data.id = `${name}2`;
    stack.data.name = `${name}:stack`;
    stack.data.shape = "rectangle";
    stack.data.bordercolor = color;
    stack.data.parent = `${name}`;

    //push resulting datapoints in elements array in property nodes
    elementsJSON.nodes.push(mallocstack);
    elementsJSON.nodes.push(stack);
  };

  //function to generate data points according to malloc_block_node statement
  const createMallocBlockNodeGraphData = (name, color) => {
    //datapoints for outer rectangle
    const mallocNode = dataFactoryNodes();
    mallocNode.data.id = `${name}`;
    mallocNode.data.name = `malloc_block_node(${name})`;
    mallocNode.data.shape = "rectangle";
    mallocNode.data.bordercolor = color;

    //datapoints for inner rectangle
    const mNode = dataFactoryNodes();
    mNode.data.id = `${name}2`;
    mNode.data.name = `${name}:node`;
    mNode.data.shape = "rectangle";
    mNode.data.bordercolor = color;
    mNode.data.parent = `${name}`;

    //push resulting datapoints in elements array in property nodes
    elementsJSON.nodes.push(mallocNode);
    elementsJSON.nodes.push(mNode);
  };

  const createNodeValue = (nodename, valuename, color) => {
    //datapoints for outer rectangle
    const node = dataFactoryNodes();
    node.data.id = `${nodename}3`;
    node.data.name = `${nodename}:node`;
    node.data.shape = "rectangle";
    node.data.bordercolor = color;

    //datapoints for inner rectangle
    const nodevalue = dataFactoryNodes();
    nodevalue.data.id = `${nodename}4`;
    nodevalue.data.name = `${valuename}:value`;
    nodevalue.data.shape = "rectangle";
    nodevalue.data.bordercolor = color;
    nodevalue.data.parent = `${nodename}3`;

    //push resulting datapoints in elements array in property nodes
    elementsJSON.nodes.push(node);
    elementsJSON.nodes.push(nodevalue);
  };

  const createNodeNextEdge = (source, target, color) => {
    const sourceNodeNextPointer = dataFactoryNodes();
    sourceNodeNextPointer.data.id = `${source}_next`;
    sourceNodeNextPointer.data.name = "next";
    sourceNodeNextPointer.data.shape = "ellipse";
    sourceNodeNextPointer.data.bordercolor = color;
    sourceNodeNextPointer.data.parent = `${source}`;

    const targetNode = dataFactoryNodes();
    targetNode.data.id = `${target}`;
    targetNode.data.name = `${target}`;
    targetNode.data.shape = "rectangle";
    targetNode.data.bordercolor = color;

    const nextEdge = dataFactoryEdges();
    nextEdge.data.id = `${source}:${target}`;
    nextEdge.data.name = "next";
    nextEdge.data.source = `${source}_next`;
    nextEdge.data.target = `${target}`;
    nextEdge.data.color = color;

    //push resulting datapoints in elements array in property nodes
    elementsJSON.nodes.push(sourceNodeNextPointer);
    elementsJSON.edges.push(nextEdge);
    elementsJSON.nodes.push(targetNode);
  };

  const createStackHeadEdge = (source, target, color) => {
    const sourceNodeHeadPointer = dataFactoryNodes();
    sourceNodeHeadPointer.data.id = `${source}:head_ellipse`;
    sourceNodeHeadPointer.data.name = "head";
    sourceNodeHeadPointer.data.shape = "ellipse";
    sourceNodeHeadPointer.data.bordercolor = color;
    sourceNodeHeadPointer.data.parent = `s:stack`;

    const targetNode = dataFactoryNodes();
    targetNode.data.id = `${target}:node`;
    targetNode.data.name = `${target}:node`;
    targetNode.data.shape = "rectangle";
    targetNode.data.bordercolor = color;

    const headPointer = dataFactoryEdges();
    headPointer.data.id = `${source}_head:pointer`;
    headPointer.data.name = "head";
    headPointer.data.source = `${source}:head_ellipse`;
    headPointer.data.target = `${target}:node`;

    //push resulting datapoints in elements array in property nodes
    elementsJSON.nodes.push(sourceNodeHeadPointer);
    elementsJSON.edges.push(headPointer);
    elementsJSON.nodes.push(targetNode);
  };

  //pull out entered name of heap chunk by the user to later determine label in graph and call create-Function to satisfy the different types of heap chunks
  const checkTypeOfHeapChunk = (value) => {
    if (value.textInput.startsWith("malloc_block_stack")) {
      const name = value.textInput.match(/\((.*)\)/).pop();
      const color = value.radioButtonColor;
      createMallocBlockStackGraphData(name, color);
    } else if (value.textInput.startsWith("malloc_block_node")) {
      const name = value.textInput.match(/\((.*)\)/).pop();
      const color = value.radioButtonColor;
      createMallocBlockNodeGraphData(name, color);
    } else if (value.textInput.startsWith("node_value")) {
      const matches = value.textInput
        .match(/\(([^)]+)\)/)[1]
        .split(", ");
      console.log(matches[0]);
      const nodename = matches[0];
      const valuename = matches[1];
      const color = value.radioButtonColor;
      createNodeValue(nodename, valuename, color);
    } else if (value.textInput.startsWith("node_next")) {
      const matches = value.textInput
        .match(/\(([^)]+)\)/)[1]
        .split(", ");
      const source = matches[0];
      const target = matches[1];
      const color = value.radioButtonColor;
      createNodeNextEdge(source, target, color);
    } else if (value.textInput.startsWith("stack_head")) {
      const matches = value.textInput
        .match(/\(([^)]+)\)/)[1]
        .split(", ");
      const source = matches[0];
      const target = matches[1];
      const color = value.radioButtonColor;
      createStackHeadEdge(source, target, color);
    } else {
        //noMatchingHeapChunk();
    }

    //else if textinput starts with stack_head
  };

  const fillElementsArray = () => {
    values.map((value) => checkTypeOfHeapChunk(value));

    //flaten the array and push nodes and edges in elementsFlat
    elementsJSON.nodes.forEach((x) => elementsFlat.push(x));
    elementsJSON.edges.forEach((x) => elementsFlat.push(x));

    //return the final Array with all data objects
    return elementsFlat;
  };

  return (
    <div>
      <button onClick={handleClick}>Draw state</button>
      <Graph elements={graphData} />
    </div>
  );
};
export default GraphCalculation;
