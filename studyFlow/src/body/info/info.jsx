import { useState } from "react";
import style from "./info.module.css";

function Info({ tasks, setTasks, clickedTask, setClickedTask }) {
  function addTimePassed() {
    if (clickedTask.time > clickedTask.timePassed) {
      setTasks(
        tasks.map((task) => {
          if (task.id === clickedTask.id) {
            return { ...task, timePassed: task.timePassed + 1 };
          } else {
            return task;
          }
        }),
      );

      setClickedTask((c) => ({ ...c, timePassed: clickedTask.timePassed + 1 }));
    }
  }

  function subtractTimePassed() {
    if (clickedTask.timePassed > 0) {
      setTasks(
        tasks.map((task) => {
          if (task.id === clickedTask.id) {
            return { ...task, timePassed: task.timePassed - 1 };
          } else {
            return task;
          }
        }),
      );

      setClickedTask((c) => ({ ...c, timePassed: clickedTask.timePassed - 1 }));
    }
  }

  let [editWindow, setEditWindow] = useState(false);
  function handleEditWindow() {
    setEditWindow(!editWindow);
  }

  {
    /* edit functions space ----------------------------------------------------------------- */
  }

  function handleTitleEdit(e) {
    setTasks(
      tasks.map((task) => {
        if (clickedTask.id === task.id) {
          return { ...task, title: e.target.value };
        } else {
          return task;
        }
      }),
    );
    setClickedTask((c) => ({ ...c, title: e.target.value }));
  }

  function handleTimeEdit(sign) {
    if (editWindow && sign === "plus" && clickedTask.time < 24) {
      setTasks(
        tasks.map((task) => {
          if (clickedTask.id === task.id) {
            return { ...task, time: task.time + 1 };
          } else {
            return task;
          }
        }),
      );
      setClickedTask((c) => ({ ...c, time: clickedTask.time + 1 }));
    }

    if (editWindow && sign === "minus" && clickedTask.time > 1) {
      setTasks(
        tasks.map((task) => {
          if (clickedTask.id === task.id) {
            return { ...task, time: task.time - 1 };
          } else {
            return task;
          }
        }),
      );
      setClickedTask((c) => ({ ...c, time: clickedTask.time - 1 }));
    }
  }

  function handleCatEdit(e) {
    setTasks(
      tasks.map((task) => {
        if (clickedTask.id === task.id) {
          return { ...task, cat: e.target.value };
        } else {
          return task;
        }
      }),
    );
    setClickedTask((c) => ({ ...c, cat: e.target.value }));
  }

  function handleDifficultyEdit(e) {
    setTasks(
      tasks.map((task) => {
        if (clickedTask.id === task.id) {
          return { ...task, difficulty: e.target.value };
        } else {
          return task;
        }
      }),
    );
    setClickedTask((c) => ({ ...c, difficulty: e.target.value }));
  }

  return (
    <>
      <hr />
      <div className={style.container}>
        {/*  main container showing info */}
        <div
          style={{ display: editWindow ? "none" : "block" }}
          className={style.main}
        >
          <h2>
            TASK WORKSPACE{" "}
            <button id="edit" onClick={handleEditWindow}>
              ✏️
            </button>{" "}
            <button id="del">🗑️</button>{" "}
          </h2>
          <p>Active WorkSpace:</p>
          <b> {clickedTask.title}</b>
          <p>Track Session Progress:</p>
          <div className={style.controls}>
            <div className={style.minus} onClick={subtractTimePassed}>
              -
            </div>
            <div className={style.amount}>
              {clickedTask.timePassed} / {clickedTask.time}h
            </div>
            <div className={style.plus} onClick={addTimePassed}>
              +
            </div>
          </div>
          <div className={style.timeStatus}>
            <div className={style.time}>
              <p>Category</p>
              <h3>{clickedTask.cat}</h3>
            </div>
            <div className={style.status}>
              <p>Target Status</p>
              <h3>{clickedTask.completed ? "Completed" : "In-Progress"}</h3>
            </div>
          </div>
        </div>

        {/*  Editing work space*/}

        <div
          style={{ display: editWindow ? "block" : "none" }}
          className={style.main}
        >
          <h2>
            TASK WORKSPACE{" "}
            <button id="edit" onClick={handleEditWindow}>
              ×
            </button>{" "}
            <button id="del" style={{ opacity: 0.5 }}>
              🗑️
            </button>{" "}
          </h2>
          <p>Task Title:</p>
          <input
            type="text"
            value={clickedTask.title}
            onChange={handleTitleEdit}
            maxLength="55"
          />
          <p>Estimated Time:</p>
          <div className={style.controls}>
            <div
              className={style.minus}
              onClick={() => handleTimeEdit("minus")}
            >
              -
            </div>
            <div className={style.amount}>{clickedTask.time}h</div>
            <div className={style.plus} onClick={() => handleTimeEdit("plus")}>
              +
            </div>
          </div>
          <div className={style.timeStatus}>
            <div className={style.time}>
              <p>Category</p>
              <input
                type="text"
                value={clickedTask.cat}
                onChange={handleCatEdit}
                maxLength="10"
              />
            </div>
            <div className={style.status}>
              <p>Difficulty</p>
              <input
                type="text"
                placeholder="Easy, Medium, Hard"
                value={clickedTask.difficulty}
                onChange={handleDifficultyEdit}
                maxLength="6"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
