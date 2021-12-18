import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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
        const spotUpdate = updateSpots(state, appointments)
        setState({
          ...state,
          days: spotUpdate,
          appointments
        });
      })
  }


  // updateSpots 

  const updateSpots = function (state, appointments) {
    let i;
    const day = state.days.find((day, index) => {
      if (state.day === day.name) {
        i = index
        return day
      };
    })
    console.log('DAY::::::>>>', state.day)
    console.log('DAY>>>', day)
    console.log('INDEX>>', i)
    let spots = 0;
    for (let day1 of day.appointments) {
      if (appointments[day1].interview === null) {
        spots++
      }
      // console.log('SPOTS >>>>', spots)
    }

    const days = [...state.days]
    console.log('STATEEEE', { ...state })

    days[i] = { ...day, spots: spots }
    return days;
  };

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
        const spotUpdate = updateSpots(state, appointments)
        setState({
          ...state,
          days: spotUpdate,
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


  return { state, cancelInterview, bookInterview, setDay }

}