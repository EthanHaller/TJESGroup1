import MyCalendar from "./MyCalendar"
import db from '../Firebase'
import React from 'react'
import { getDocs, collection } from "firebase/firestore";
import {useEffect, useState} from 'react';
function Events(props) {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if(props.currentUser && props.currentUser.role === 'admin') {
            setIsAdmin(true);
        }
        const fetchEvents = async () => {
            const snapshot = await getDocs(collection(db, 'calendar'));
            const eventList = snapshot.docs.map(doc => doc.data());
            setCalendarEvents(eventList);
        }
        
        fetchEvents();
    }, [props.currentUser]);
    return (
      <MyCalendar event_array = {calendarEvents} isAdmin = {isAdmin}/>
    );
}
export default Events;