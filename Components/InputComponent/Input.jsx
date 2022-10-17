import React, { useState, useContext  } from "react";
import { DataContext } from "../../pages/index";


const Input = () => {
  const { values, setValues } = useContext(DataContext);
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  //updating the object and then saving it back to state object
  const handleTextInputChange = (event) => {
    //event.persist();
    setValues((values) => ({
      ...values, //copy old vaues
      textInput: event.target.value,
    }));
  };

  const handleRadioButtonChange = (event) => {
    //event.persist();
    setValues((values) => ({
      ...values, //copy old vaues
      radioButtonColor: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //will stop the refreshing of the page
    if(values.textInput && values.radioButtonColor) {
      setValid(true);
  }
    setSubmitted(true);
  };
  console.log(`state: ${values.textInput}, ${values.radioButtonColor}`);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="heap-chunk"
          type="text"
          placeholder="Heap Chunk"
          name="heapChunkRow"
          value={values.textInput}
          onChange={handleTextInputChange}
        />
        {submitted && !values.textInput && <span id="heap-chunk-error">Please enter a Heap Chunk</span>}
        <label htmlFor="radioButtonBlack">
          black
        </label>
        <input
          id="black"
          type="radio"
          name="radiocolor"
          value="black"
          onChange={handleRadioButtonChange}
        />
        <label htmlFor="radioButtonGreen">
          green
        </label>
        <input
          id="green"
          type="radio"
          name="radiocolor"
          value="green"
          onChange={handleRadioButtonChange}
        />
        <label htmlFor="radioButtonRed">
          red
        </label>
        <input
          id="red"
          type="radio"
          name="radiocolor"
          value="red"
          onChange={handleRadioButtonChange}
        />

        <button type="submit">submit row</button>
      </form>
      {valid && submitted && <div>Success! Thank you for registering</div>}
    </div>
  );
};

export default Input;
