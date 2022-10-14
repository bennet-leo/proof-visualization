import React, {useContext, useEffect  } from 'react'

const Input = () => {

    return (
        <form action="/api/form" method="post">
          <label htmlFor="heapchunk_row">Heap chunk</label>
          <input type="text" id="heapchunk_row" name="heapchunk_row" required/>

          {/* <label htmlFor="color_black">black</label>
          <input type="radio" id="color_black" name="color_black" />

          <label htmlFor="color_green">green</label>
          <input type="radio" id="color_green" name="color_green" /> */}
    
          <button type="submit">submit row</button>
        </form>
      )
}

export default Input