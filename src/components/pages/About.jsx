import Card from "../shared/Card"
import {Link} from "react-router-dom"

function About(){
  return(
    <Card>
      <div className="about">
        <h1>Hey</h1>
        <p>A practice React App</p>

        <Link to="/">Homepage</Link>
      </div>
    </Card>
  )
}
export default About;