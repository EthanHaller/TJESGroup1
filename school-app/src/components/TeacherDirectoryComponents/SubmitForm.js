import {useState, React} from 'react';
import {addDoc, collection} from "firebase/firestore";
import db from '../../Firebase';
import { Button } from '@mui/material';
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
        addDoc(collection(db, "teachers"), {
        name: formJson.name,
        gradeTaught: formJson.gradeTaught,
        email: formJson.email,
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
      Grade Taught: 
      <input
      className= "textBoxes" 
      name="gradeTaught" 
      required
      />
    </label>
    <label>
      Email: 
      <input
      className= "textBoxes" 
      name="email"
      required
      />
    </label>
    <Button 
    variant='contained'
    className= "searchButton"
    type="submit"
    style= {{margin: "15px"}}
    >Submit</Button>
  </form>
}
</div>
    );
}