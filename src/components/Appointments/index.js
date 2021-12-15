import React, { Fragment } from "react"
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointments/styles.scss"
import Form from "./form";
import Status from "./status";
import Confirm  from "./confirm";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

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

  function deleting() {
    transition("CONFIRM")
    props.cancelInterview(props.id, props.interview)
    .then (() => {
      transition("EMPTY")
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
        onDelete={deleting}
        // onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers}
        // onCancel={() => back()}
        onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} /> }
      {mode === CONFIRM && <Confirm message={"Are you sure you want to confirm"} onConfirm={() => transition("DELETING")} onCancel={() => back} /> }
     
    </article>
  );
}