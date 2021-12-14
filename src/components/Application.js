import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointments from "components/Appointments"
import axios from "axios";
import { getAppointmentsForDay, getInterviewsForDay, getInterview } from "helpers/selectors"



//function

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    // interview: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })


  }


  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));
  // const[days, setDays] = useState([]);

  // const [day, setDay] = useState("Monday");

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      console.log(all[0].data)
      console.log(all[1].data)
      console.log(all[2].data)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })

  }, []);



  const dailyAppointments = getAppointmentsForDay(state, state.day)
 

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    return <Appointments
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview} 
      interviewers={getInterviewsForDay(state, state.day)}
      bookInterview={bookInterview}
      />

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
          <DayList days={state.days} day={state.day} value={state.day} onChange={setDay} />
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
