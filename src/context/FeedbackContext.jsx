import {createContext, useState} from "react"
import {v4 as uuidv4} from "uuid"
const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) =>{
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "Context text 1",
      rating: 7
    },
    {
      id: 2,
      text: "Context text 2",
      rating: 6
    }
  ]);
  const [editFB, setEditFB] = useState({
    item: {},
    edit: false
  });

  // Create/Read
  const addFeedback = (newFeedback) =>{
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  }

  // Delete
  const deleteFeedback = (id) =>{
    if(window.confirm("Are You Sure?")){
      setFeedback(feedback.filter((item) => item.id !==id))
    }
  }

  // Setting the update
  const editFeedback = (item) =>{
    setEditFB({
      item,
      edit: true
    });
  }

  // Update
  const updateFeedback = (id, updatedItem) =>{
    setEditFB(feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item))
  }

  return(
    <FeedbackContext.Provider value={{
      feedback,
      editFB,// From the useState hook
      deleteFeedback,
      addFeedback,
      editFeedback, // The name of the function that edits our review text
      updateFeedback,
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext;