import {createContext, useState, useEffect} from "react"
const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) =>{
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editFB, setEditFB] = useState({
    item: {},
    edit: false
  });

  useEffect(() =>{
    fetchFeedback();
  }, []);

  
  const fetchFeedback = async () =>{
    const response = await fetch("http://localhost:5000/feedback?_sort=rating")
    const data = await response.json();

    setFeedback(data);
    setLoading(false);
  }

  // Create/Read
  const addFeedback = async (newFeedback) => {
    const response = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
  }

  // Delete
  const deleteFeedback = async (id) =>{
    if(window.confirm("Are You Sure?")){
      await fetch(`/feedback/${id}`, {method: 'DELETE'})
      setFeedback(feedback.filter((item) => item.id !==id));
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
  const updateFeedback = async (id, updatedItem) =>{
    const response = await fetch(`http://localhost:5000/feedback/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    });
    const data = await response.json();

    setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item));
  }

  return(
    <FeedbackContext.Provider value={{
      feedback,
      editFB,// From the useState hook
      loading,
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