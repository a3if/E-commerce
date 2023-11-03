import React, { useState } from 'react'
import ReactLoading from 'react-loading';
import BounceLoader from "react-spinners/BounceLoader";
const Loading = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#2d82b2");
  return (

    <div className='flex justify-center mt-[370px]'>
    {/* <ReactLoading type={'bars'} color={'#007BFF'} height={100} width={100} /> */}
    <BounceLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
   
  </div>
  )
}

export default Loading