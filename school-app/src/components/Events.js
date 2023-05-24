import MyCalendar from "./MyCalendar"
import db from '../Firebase'
import React from 'react'
import { getDocs, collection } from "firebase/firestore";
import {useEffect, useState} from 'react';
function Events() {
        const [calendarEvents, setCalendarEvents] = useState([]);
        const fetchEvents = async (successCallback, failureCallback) => {
        const events = [];
      
        try {
          getDocs(collection(db, 'calendar'))
          .then((allDocs) => {
            allDocs.forEach((doc) => {
                const { title, start, end} = doc.data();
                events.push({ title, start, end});
            }
            );
        });
          successCallback(events);
        } catch (error) {
          failureCallback(error);
        }
      };
      useEffect(() => {
        fetchEvents( 
          setCalendarEvents,
          console.error
        );
      }, []);
    //   function updateVar() {
    //     setCalendarEvents(calendarEvents);
    //     setRendered(true);
    //   }
    //   if(!rendered) {
    //     const myTimeout = setTimeout(updateVar, 1000);
    //   }
    //   useEffect( ()=> {

    //   }, [calendarEvents]);
    return (
        <MyCalendar event_array = {calendarEvents}/>
    );
}
export default Events;