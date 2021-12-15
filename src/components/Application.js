import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointments from "components/Appointments"
import axios from "axios";
import { getAppointmentsForDay, getInterviewsForDay, getInterview } from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData";



//function

export default function Application(props) {
  // Export hooks here
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  //Define getAppointmentsForDay function for ease of use
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  //Map through appointments
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    return <Appointments
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview} 
      interviewers={getInterviewsForDay(state, state.day)}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
