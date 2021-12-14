import React, { Fragment } from "react"
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointments/styles.scss"
import Form from "./form";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={[]}
        onCancel={() => back()}/>
      )}
    </article>
  );

}