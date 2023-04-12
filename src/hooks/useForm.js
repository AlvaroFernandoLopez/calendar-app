import { useEffect, useState } from "react"



export const useForm = (initialForm={}) => {
    const [inputValue, setInputValue]=useState(initialForm);
    
   
    const onInputChange=(e)=>{
        const {name, value} = e.target;
        setInputValue({...inputValue, [name]:value})
    }


  return {
    onInputChange,
    inputValue
  }
   
  
}
