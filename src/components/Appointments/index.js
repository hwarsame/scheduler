import React, {Fragment} from "react"
import Header from "./header";
import Show from "./show";
import Empty from "./empty";



import "components/Appointments/styles.scss"
export default function Appointment (props) {
  return (
    <article className="appointment"> 
    <Header time={props.time}  />
    {props.interview ? <Show interviewer={props.interviewer} student={props.interview.student} /> : <Empty /> }
    </article>
  );

  }