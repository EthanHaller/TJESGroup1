import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Box from '@mui/material/Box'
function MyCalendar(props) {

  // const handleAddEventsClick = () => {

  // }
    return (
       <Box>
          <FullCalendar
          plugins={[ dayGridPlugin ]}
          events = {props.event_array}
          initialView="dayGridMonth"
          headerToolbar = {{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth"
          }}
          buttonText={{
            dayGridMonth: 'Show events',
          }}
          
          />
      </Box> 
    );
}

export default MyCalendar;