import React, { useState, useContext } from "react";
import { DataContext } from "../../pages/index";
import Output from "../Output/Output";

const Input = () => {
  const [values, setValues] = useContext(DataContext);
  let [textInput, setTextInput] = useState("Heap Chunks");
  let [colorInput, setColorInput] = useState("black");
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  //change state of text input field while typing (letter by letter)
  const handleTextInputChange = (event) => {
    event.persist();
    setTextInput(event.target.value);
  };
  //change state of radiobutton color when clicked
  const handleRadioButtonChange = (event) => {
    event.persist();
    setColorInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //will stop the refreshing of the page
    //adding up the new values to values State in ReactContext
    setValues((values) => [
      ...values,
      { textInput: textInput, radioButtonColor: colorInput },
    ]);

    //wenn Text input und Farbwahl getroffen, setze state auf valid und submitted
    if (values.textInput && values.radioButtonColor) {
      setValid(true);
    }
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="heap-chunk"
          type="text"
          placeholder="Heap Chunk"
          name="heapChunkRow"
          value={textInput}
          onChange={handleTextInputChange}
        />
        {submitted && !values.textInput && (
          <span id="heap-chunk-error">Please enter a Heap Chunk</span>
        )}
        <label htmlFor="radioButtonBlack">black</label>
        <input
          id="black"
          type="radio"
          name="radiocolor"
          value="black"
          onChange={handleRadioButtonChange}
        />
        <label htmlFor="radioButtonGreen">green</label>
        <input
          id="green"
          type="radio"
          name="radiocolor"
          value="green"
          onChange={handleRadioButtonChange}
        />
        <label htmlFor="radioButtonRed">red</label>
        <input
          id="red"
          type="radio"
          name="radiocolor"
          value="red"
          onChange={handleRadioButtonChange}
        />

        <button type="submit">submit row</button>
      </form>
      {submitted && !colorInput && <div>Please chose a color!</div>}
      {valid && submitted && (
        <div>Success! Thank you for registering</div>
      )}

      <Output />
    </div>
  );
};

export default Input;
