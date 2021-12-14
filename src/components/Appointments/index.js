import React, { Fragment } from "react"
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointments/styles.scss"
import Form from "./form";
import Status from "./status";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING")
    
    props.bookInterview(props.id, interview)
    .then(() => {
      transition("SHOW")
    }) 
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
    </article>
  );
}