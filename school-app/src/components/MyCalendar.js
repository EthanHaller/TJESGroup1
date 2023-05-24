import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Box from '@mui/material/Box'
import { CssBaseline } from '@mui/material';
function MyCalendar(props) {

  // const handleAddEventsClick = () => {

  // }
    return (
       <Box mt='80px' ml='80px' mr='80px' pb='80px'>
          <CssBaseline />
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
          style={{ width: '100%', margin: '0 auto' }}
          />
      </Box> 
    );
}

export default MyCalendar;