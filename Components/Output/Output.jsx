import styles from "./output.module.scss"
import React, {useContext} from 'react'
import { DataContext } from "../../pages/index";

const Output = () => {
    const  [values] = useContext(DataContext);
  return (
    <div>
        
        {values.map(value => (
        <div className={styles.textoutput}key={value.textInput} style={{padding:'10px'}}>
          Movie Name:{' '}
          <span style={{ color: 'red', fontStyle: 'italic' }}>
            {value.textInput}
          </span>{' '}
          | Director Name{' '}
          <span style={{ color: 'red', fontStyle: 'italic' }}>
            {value.radioButtonColor}
          </span>
        </div>
      ))}

    </div>
  )
}

export default Output