import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Box from '@mui/material/Box'
import db from '../Firebase'
import { deleteDoc, getDocs, query, addDoc, collection , doc, where} from "firebase/firestore";

function MyCalendar(props) {

  function refresh() {
    window.location.reload(false);
  }
  const handleAddEventsClick = () => {
    const titleResponse = prompt('What is the title of your event?');
    const startResponse = prompt('What is the start date of your event? (YYYY-MM-DD)')
    const endResponse = prompt('What is the end date of your event? (YYYY-MM-DD)')
    if(titleResponse && startResponse && endResponse) {
      addDoc(collection(db, 'calendar'), {
        title: titleResponse,
        start: startResponse,
        end: endResponse
      })
      .then(() => {
        setTimeout(refresh(), 3000);
      });
    }

  }
  const handleDeleteEventsClick =  async () => {
    const titleResponse = prompt('What is the title of the event you want to delete?');
    if(titleResponse) {
      const q = query(collection(db, "calendar"), where("title", "==", titleResponse));

      const querySnapshot =  await getDocs(q);
      querySnapshot.forEach((document) => {
      deleteDoc(doc(db, 'calendar', document.id))
      .then(() => {
        setTimeout(refresh(), 3000);
      });
   });
  }
}
    return (
       <Box>
          <FullCalendar
          
          plugins={[ dayGridPlugin ]}
          events = {props.event_array}
          initialView="dayGridMonth"
          headerToolbar = {{
            left: "prevYear,prev,next,nextYear",
            center: "title",
            right: "dayGridDay,dayGridWeek,dayGridMonth add,delete"
          }}
          customButtons={{
            add: {
              text: 'Add Event',
              click: handleAddEventsClick,
              className: 'add-event-button'
            },
            delete: {
              text: 'Delete Event',
              click: handleDeleteEventsClick,
              
            }
          }}
          />
      </Box> 
    );
}

export default MyCalendar;