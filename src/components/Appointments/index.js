import React from "react"
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointments/styles.scss"
import Form from "./form";
import Status from "./status";
import Confirm from "./confirm";
import Error from "./error";


export default function Appointment(props) {
  console.log('PROPS:>>>>>>>>>>>>>>>>>>', props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

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
      }).catch(() => {
        transition("ERROR_SAVE", true)
      })
  }

  function deleting() {
    console.log('DELETE FUNCTION >>>>*******', props.interview )
    transition("DELETING")
    props.cancelInterview(props.id, props.interview)
      .then(() => {
        transition("EMPTY")
      }).catch(() => {
        transition("ERROR_DELETE", true)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview ? props.interview.interviewer? props.interview.interviewer.name : '' : ''}
          onDelete={() => transition("CONFIRM")}
          onEdit={() => transition("EDIT")}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={ props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to confirm"} onConfirm={deleting} onCancel={() => back()} />}
      {mode === EDIT && <Form interviewer={props.interview.interviewer.id} interviewers={props.interviewers} student={props.interview.student} onSave={save} onCancel={back} />}
      {mode === ERROR_SAVE && <Error message="Error Saving, Please Try gain" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Error Deleting, Please Try Again" onClose={()=> transition(SHOW)} />}
    </article>
  );
}