import style from "./header.module.css";
import { totalHoursContext } from "../App";
import { useContext } from "react";
function Header({tasksCompleted,totalTasks}) {
  let totalHours = useContext(totalHoursContext)
  return (
    <>
      <div className={style.header}>
        <div className={style.leftSide}>
          <h1>StudyFlow Workspace</h1>
          <p>Manage Your Dynamic Active Focus Tracks!</p>
        </div>
        <div className={style.rightSide}>
          <div className={style.totalDuration}>
            <p>Study Duration</p>
            <b>{totalHours} hrs</b>
          </div>
          <div className={style.totalTasks}>
            <p> Tasks Completed</p>
            <b>{tasksCompleted} / {totalTasks.length}</b>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Header;
