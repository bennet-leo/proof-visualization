import React, { useContext, useEffect, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { DataContext } from "../../pages";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

const Graph = ({ elements }) => {
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

  return (
    <div>
      <CytoscapeComponent
        elements={elements}
        stylesheet={style}
        style={{ width: "600px", height: "600px" }}
        layout={layout}
      />
    </div>
  );
};

export default Graph;
