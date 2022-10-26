import styles from "./output.module.scss"
import React, {useContext} from 'react'
import { DataContext } from "../../pages/graph";

const Output = () => {
    const  [values] = useContext(DataContext);
  return (
    <div>
        {values.slice(1).map(value => (
        <div className={styles.textoutput}key={value.textInput} style={{padding:'10px'}}>
          <span style={{ color: 'white', fontStyle: 'italic' }}>
            {value.textInput}
          </span>{' -> '}
          <span style={{ color: 'white', fontStyle: 'italic' }}>
            {value.radioButtonColor}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Output