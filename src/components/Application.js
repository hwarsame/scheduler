import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointments from "components/Appointments"
import axios from "axios";
import {getAppointmentsForDay} from "helpers/selectors"

//Appointments mock data

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

//function

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  

  const setDay = day => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  // const[days, setDays] = useState([]);

  // const [day, setDay] = useState("Monday");

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      console.log(all[0].data)
      console.log(all[1].data)
      console.log(all[2].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviews: all[2].data }))
    })

  } , []);



  const dailyAppointments = getAppointmentsForDay(state, state.day)
  



  const schedule = dailyAppointments.map((appointment) => {
    return <Appointments key={appointment.id}  {...appointment} />

  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} value={state.day} onChange={setDay}  />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointments key="last" time="5pm" />
      </section>

    </main>
  );
}
