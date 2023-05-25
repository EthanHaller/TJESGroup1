import MyCalendar from "./MyCalendar"
import db from '../Firebase'
import React from 'react'
import { getDocs, collection } from "firebase/firestore";
import {useEffect, useState} from 'react';
import { Box, Typography } from "@mui/material";
function Events() {
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const snapshot = await getDocs(collection(db, 'calendar'));
            const eventList = snapshot.docs.map(doc => doc.data());
            setCalendarEvents(eventList);
        }
        
        fetchEvents();
    }, []);
    return (
      <MyCalendar event_array = {calendarEvents}/>
    );
}
export default Events;