import DayListItem from "components/DayListItem";


export function getAppointmentsForDay(state, day) {
    const filteredDays = state.days.find((days) => days.name  === day)
    if (!state.days.length || !filteredDays) {
      return [];
    }
    else {
      return filteredDays.appointments.map((id) => state.appointments[id])
    }
}