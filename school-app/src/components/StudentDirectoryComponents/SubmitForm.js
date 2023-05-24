import {useState, React} from 'react';
import {addDoc, collection} from "firebase/firestore";
import db from '../../Firebase';
export default function SubmitForm({changeIsDataChanged, isDataChanged, togglePopup}) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
   
        const formJson = Object.fromEntries(formData.entries());
        setFormSubmitted(true);
        addDoc(collection(db, "students"), {
        name: formJson.name,
        year: formJson.year,
        address: formJson.address,
        }
        )
        changeIsDataChanged(!isDataChanged);
        togglePopup();
        }
      
    return (
        <div className='submitForm'>
    {formSubmitted? <p1></p1> : 
    <form method="post" onSubmit={handleSubmit}>
    <label>
      Name: <input
      name="name" 
      required
      />
    </label>
    <label>
      Year: 
      <input
      className= "textBoxes" 
      name="year" 
      required
      />
    </label>
    <label>
      Address: 
      <input
      className= "textBoxes" 
      name="address"
      required
      />
    </label>
    <button 
    className= "searchButton"
    type="submit"
    style= {{margin: "15px"}}
    >Submit</button>
  </form>
}
</div>
    );
}