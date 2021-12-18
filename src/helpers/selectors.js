import DayListItem from "components/DayListItem";
import InterviewerListItem from "components/InterviewerListItem";

//getAppointmentsForDay helper function
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((days) => days.name === day)
  if (!state.days.length || !filteredDays) {
    return [];
  }
  else {
    return filteredDays.appointments.map((id) => state.appointments[id])
  }
}


//getInterviewsForDay function

export function getInterviewsForDay(state, day) {
  let arr = []
  let interviewersArr = []
  for (let weekDay of state.days) {
    if (weekDay.name === day) {
      interviewersArr = weekDay.interviewers
    }
  }
  console.log('INTERVIEWERSARR', interviewersArr)
  for (let val of interviewersArr) {
    arr.push(state.interviewers[val])
  }
  console.log('ARRAY>>>>', arr)
  return arr;
}




//getInterviewFunction

export function getInterview(state, interview) {
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