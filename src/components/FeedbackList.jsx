import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion"
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList(){
  const {feedback} = useContext(FeedbackContext)
  return(
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