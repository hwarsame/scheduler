import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {

// State
 const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interview: {}
  });


  //BookInterview 
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



  //Cancel interview
  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`)
    .then((data) => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state,
        appointments
      });
    })
  }


  //Set day
  const setDay = day => setState({ ...state, day });




  //useEffect
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


  return {state, cancelInterview, bookInterview, setDay}

}