import styles from "./output.module.scss"
import React, {useContext} from 'react'
import { DataContext } from "../../pages/index";

const Output = () => {
    const { values, setValues } = useContext(DataContext);
  return (
    <div>
        <div className={styles.textoutput}>{values.textInput}</div>
    </div>
  )
}

export default Output