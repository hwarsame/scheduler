import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  // const setInterviewer = () => {
  //   console.log("selected")
  // }
  
const interviewerClass = classNames("interviewers__item", {
  "interviewers__item--selected" : props.selected
});

//  const setInterviewer = (id) => {
//   return id
//   }

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  );

}