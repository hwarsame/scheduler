import DayListItem from "components/DayListItem";
import InterviewerListItem from "components/InterviewerListItem";


export function getAppointmentsForDay(state, day) {
    const filteredDays = state.days.find((days) => days.name  === day)
    if (!state.days.length || !filteredDays) {
      return [];
    }
    else {
      return filteredDays.appointments.map((id) => state.appointments[id])
    }
}


export function getInterview(state, interview) {
  console.log('STATE>>>>>>>',state)
  if (interview) {
    let IdInterviewer = interview.interviewer;
    let student = interview.student

    return {
      student, 
      interviewer: state.interviewers[IdInterviewer]
    }
  }
  
    return null;

}