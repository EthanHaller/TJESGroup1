import { useState, useEffect } from "react";
import {updateDoc, doc} from "firebase/firestore";
import db from "../../Firebase";
import silhouette from './silhouette.png'
import { Button } from "@mui/material";
export default function EditStudentForm({toggleStudentView, data, changeIsDataChanged, isDataChanged, currentUser}) {

    const [isEdit, setIsEdit] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState("hidden")
    const [isEditButton, setIsEditButton] = useState("Edit Info");
    useEffect(() => {
        if (!isEdit)
        setIsVisible("visible");
        if (isEdit)
        setIsVisible("hidden")
    },[isEdit])

    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
   
        const formJson = Object.fromEntries(formData.entries());
        setFormSubmitted(true);
        await updateDoc(doc(db, "students",data.id), {
        name: formJson.name,
        year: formJson.year,
        address: formJson.address,
        }
        )
        toggleStudentView();
        changeIsDataChanged(!isDataChanged);
        }

        function handleEdit() {
            setIsEdit(!isEdit);
            if (isEdit)
            setIsEditButton("Stop Editing");
            if (!isEdit)
            setIsEditButton("Edit Info");

        }

    return (
        <div className='submitForm'>
    {formSubmitted? <p1></p1> : 
    <div className="editStudentBox">
    <img src= {silhouette} className="editStudentPic"/>
    {(currentUser.role === "admin") && <Button variant= "contained" onClick={handleEdit} className="editStudentEditButton">{isEditButton}</Button>}
    <form method="post" onSubmit={handleSubmit}>
      <div className="editStudentLabels">
    <label className="editStudentLabel">
      Name: 
      <input
      
      name="name" 
      defaultValue={data.data.name}
      required
      readOnly= {isEdit}
      />
    </label>
    <label className="editStudentLabel">
      Year: 
      <input
      className= "textBoxes" 
      name="year" 
      required
      readOnly={isEdit}
      defaultValue={data.data.year}
      />
    </label>
    <label className="editStudentLabel">
      Address: 
      <input
      className= "textBoxes" 
      name="address"
      readOnly={isEdit}
      defaultValue={data.data.address}
      required
      />
    </label>
    </div>
    <div className="editStudentButton">
    <Button 
    className= {isVisible}
    type="submit"
    variant="contained"
    style= {{margin: "15px", visibility: {isVisible}}}
    >Submit</Button>
    </div>
  </form>
  </div>
}
</div>
    );
}