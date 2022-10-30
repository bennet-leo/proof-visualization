import React from 'react'
import Zahlenstrahl from '../Components/Numberline/zahlenstrahl.tsx'
import dataHandler from '../Components/Numberline/dataHandler'
import CookiePrinter from '../Components/Numberline/cookiePrinter'

const Zahlenstrahl_1_name = "1";
const Zahlenstrahl_2_name = "2";
const Zahlenstrahl_3_name = "3";
const Zahlenstrahl_4_name = "4";
const Zahlenstrahl_5_name = "5";
const Zahlenstrahl_gesamt_name = "Gesamtdarstellung";
const Successor = () => {
  return (
    <div>
    <div><Zahlenstrahl name={Zahlenstrahl_1_name} /></div>
  <div>Definitionsbereich von a</div>
  <div>
    <label>a </label>
    <select id = {"operator"+Zahlenstrahl_1_name}>
      <option defaultValue>&#62;</option>
      <option>&#8805;</option>
      <option>&#60;</option>
      <option>&#8804;</option>
      <option>=</option>
      <option>!=</option>
    </select>
    <input type="text" id={"value"+Zahlenstrahl_1_name}onClick={() => clear(Zahlenstrahl_1_name)} />
  </div>
  <div>
    <button onClick={() => dataToJson(Zahlenstrahl_1_name)} >Hinzufügen</button>
    <button onClick={() => reset(Zahlenstrahl_1_name)} >Reset</button>
    <button onClick={() => showData(Zahlenstrahl_1_name)} >Daten anzeigen</button>
    <button onClick={() => Vis(Zahlenstrahl_1_name)} >Visualiserung anzeigen</button>     
  </div>
      <div><Zahlenstrahl name={Zahlenstrahl_2_name} /></div>
    <div>Definitionsbereich von a</div>
    <div>
      <label>a </label>
      <select id = {"operator"+Zahlenstrahl_2_name}>
        <option defaultValue>&#62;</option>
        <option>&#8805;</option>
        <option>&#60;</option>
        <option>&#8804;</option>
        <option>=</option>
        <option>!=</option>
      </select>
      <input type="text" id={"value"+Zahlenstrahl_2_name}onClick={() => clear(Zahlenstrahl_2_name)} />
    </div>
    <div>
      <button onClick={() => dataToJson(Zahlenstrahl_2_name)} >Hinzufügen</button>
      <button onClick={() => reset(Zahlenstrahl_2_name)} >Reset</button>
      <button onClick={() => showData(Zahlenstrahl_2_name)} >Daten anzeigen</button>
      <button onClick={() => Vis(Zahlenstrahl_2_name)} >Visualiserung anzeigen</button>     
    </div>
      <div><Zahlenstrahl name={Zahlenstrahl_3_name} /></div>
    <div>Definitionsbereich von a</div>
    <div>
      <label>a </label>
      <select id = {"operator"+Zahlenstrahl_3_name}>
        <option defaultValue>&#62;</option>
        <option>&#8805;</option>
        <option>&#60;</option>
        <option>&#8804;</option>
        <option>=</option>
        <option>!=</option>
      </select>
      <input type="text" id={"value"+Zahlenstrahl_3_name}onClick={() => clear(Zahlenstrahl_3_name)} />
    </div>
    <div>
      <button onClick={() => dataToJson(Zahlenstrahl_3_name)} >Hinzufügen</button>
      <button onClick={() => reset(Zahlenstrahl_3_name)} >Reset</button>
      <button onClick={() => showData(Zahlenstrahl_3_name)} >Daten anzeigen</button>
      <button onClick={() => Vis(Zahlenstrahl_3_name)} >Visualiserung anzeigen</button>     
    </div>
      <div><Zahlenstrahl name={Zahlenstrahl_4_name} /></div>
    <div>Definitionsbereich von a</div>
    <div>
      <label>a </label>
      <select id = {"operator"+Zahlenstrahl_4_name}>
        <option defaultValue>&#62;</option>
        <option>&#8805;</option>
        <option>&#60;</option>
        <option>&#8804;</option>
        <option>=</option>
        <option>!=</option>
      </select>
      <input type="text" id={"value"+Zahlenstrahl_4_name}onClick={() => clear(Zahlenstrahl_4_name)} />
    </div>
    <div>
      <button onClick={() => dataToJson(Zahlenstrahl_4_name)} >Hinzufügen</button>
      <button onClick={() => reset(Zahlenstrahl_4_name)} >Reset</button>
      <button onClick={() => showData(Zahlenstrahl_4_name)} >Daten anzeigen</button>
      <button onClick={() => Vis(Zahlenstrahl_4_name)} >Visualiserung anzeigen</button>     
    </div>
      <div><Zahlenstrahl name={Zahlenstrahl_5_name} /></div>
    <div>Definitionsbereich von a</div>
    <div>
      <label>a </label>
      <select id = {"operator"+Zahlenstrahl_5_name}>
        <option defaultValue>&#62;</option>
        <option>&#8805;</option>
        <option>&#60;</option>
        <option>&#8804;</option>
        <option>=</option>
        <option>!=</option>
      </select>
      <input type="text" id={"value"+Zahlenstrahl_5_name}onClick={() => clear(Zahlenstrahl_5_name)} />
    </div>
    <div>
      <button onClick={() => dataToJson(Zahlenstrahl_5_name)} >Hinzufügen</button>
      <button onClick={() => reset(Zahlenstrahl_5_name)} >Reset</button>
      <button onClick={() => showData(Zahlenstrahl_5_name)} >Daten anzeigen</button>
      <button onClick={() => Vis(Zahlenstrahl_5_name)} >Visualiserung anzeigen</button>     
    </div>
      <div><Zahlenstrahl name={Zahlenstrahl_gesamt_name} /></div>
    <div>Definitionsbereich von a</div>
    <div>
      <button onClick={() => Vis(Zahlenstrahl_gesamt_name)} >Visualiserung anzeigen</button>     
    </div>
    </div>
  )
}

export default Successor

function showData(Cookiname){
  var text = CookiePrinter(Cookiname);
}

 function clear(name){
  const inputField = document.getElementById("value"+name);
  inputField.value = "";
 }

 async function dataToJson(CookieName) {
   let operator = document.getElementById("operator"+CookieName).value;
   let value = document.getElementById("value"+CookieName).value;
    if( !isNaN(value) && value.length !== 0 ){ //
      let text = dataHandler(operator, value,CookieName);
   }else{
    alert("Bitte eine Zahl eingeben.")
    clear();
    }
 }
 function Vis(){
  location.reload();
 }
 function reset(CookieName){
   dataHandler('delete', 0, CookieName);
   location.reload();
 }