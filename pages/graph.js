import React, { useState, createContext } from "react";
import Input from "../Components/InputComponent/Input";
import GraphCalculation from "../Components/GraphCalculation/GraphCalculation";

export const DataContext = createContext();

const Graph = () => {
    //data object, provided by React context for the other components to consume during runtime
  const [values, setValues] = useState([
    {
      textInput: "Heap Chunks allready entered",
      radioButtonColor: "Color of the textline",
    },
  ]);

  return (
    <div>
        <h1>Graph Example</h1>
      {/* Provider wraps the components that are to be supplied with the data object */}
      <DataContext.Provider value={[values, setValues]}>
        <Input />
        <GraphCalculation />
      </DataContext.Provider>
    </div>
  );
};

export default Graph;
