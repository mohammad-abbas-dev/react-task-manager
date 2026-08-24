import style from "./header.module.css";

function Header() {
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
            <b>6 hrs</b>
          </div>
          <div className={style.totalTasks}>
            <p> Tasks Completed</p>
            <b>1 / 5</b>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Header;
