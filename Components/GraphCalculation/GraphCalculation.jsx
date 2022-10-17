import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { DataContext } from "../../pages";

const GraphCalculation = () => {
  
  function Data() {
    const value = React.useContext(UserContext);  
      
    return <h1>{value}</h1>;
  }

  return (
    <div>
      GraphCalculation
        <CytoscapeComponent
          elements={[
            {
              data: {
                id: "one",
                label: "Node 1",
              },
              position: { x: 30, y: 100 },
            },
            {
              data: {
                id: "two",
                label: "Node 2",
              },
              position: { x: 100, y: 100 },
            },
            {
              data: {
                source: "one",
                target: "two",
                label: "Edge from Node1 to Node2",
              },
            },
          ]}
          style={{
            width: "600px",
            height: "600px",
          }}
        />
      
    </div>
  );
};
export default GraphCalculation;
