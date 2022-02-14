import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext";

function Rating({select}){
  const [selected, setSelected] = useState()

  const {editFB} = useContext(FeedbackContext);

  useEffect(() => {
    setSelected(editFB.item.rating);
  },[editFB]);
 
  const handleChange = (num) => () =>{
    setSelected(num);
    select(num);
  }
 
  return(
    <ul className='rating'>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <li key={num}>
          <input
            type='radio'
            id={`num${num}`}
            name='rating'
            onChange={handleChange(num)}
            checked={selected === num}
          />
          <label htmlFor={`num${num}`}>{`${num}`}</label>
        </li>
      ))}
    </ul>
  )
}
export default Rating;