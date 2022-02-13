import { useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import Rating from "./Rating";

function FeedbackForm({handleAdd}){
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnStat, setBtnStat] = useState(true);
  const [msg, setMsg] = useState("");

  const handleText = ({ target: { value } }) =>{
    if(value === ""){
      setBtnStat(true)
      setMsg(null)
    }
    else if(value.trim().length <= 10){
      setMsg("Must have at least 10 characters");
      setBtnStat(true);
    }
    else{
      setMsg(null)
      setBtnStat(false)
    }
    setText(value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(text.trim().length > 10){
      const newFeedback = {
        text,
        rating
      }
      handleAdd(newFeedback);
      setText("");
    }
  }

  return(
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate us?</h2>
            <Rating select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input
                onChange={handleText}
                type="text"
                placeholder="Write a review"
                value={text}/>
                <Button type="submit" isDisabled={btnStat}>Send</Button>
            </div>
            {msg && <div className="message">{msg}</div>}
        </form>
    </Card>
  )
}
export default FeedbackForm