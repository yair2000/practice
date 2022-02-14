import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion"
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";
import Spinner from "./shared/Spinner";

function FeedbackList(){
  const {feedback, loading} = useContext(FeedbackContext)

  if(!loading && (!feedback || feedback.length === 0)){
    return <p>No feedbacks</p>
  }
  return loading ? <Spinner/> : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) =>(
          <motion.div
          key={item.id}
          initial={{opacity: 0}} // Fade in
          animate={{opacity: 1}}
          // Fade Out
          exit={{opacity: 0}}>
            <FeedbackItem key={item.id} item={item}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
export default FeedbackList;