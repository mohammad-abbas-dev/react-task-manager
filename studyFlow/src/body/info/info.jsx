import { useEffect, useState } from "react";
import style from "./info.module.css";

function Info({
  tasks,
  setTasks,
  clickedTask,
  setClickedTask,
  setCreateWindow,
  createWindow,
  setNewTask,
  setNewTaskTitle,
  setNewTaskCat,
  setNewTaskDifficulty,
  setNewTaskTime,
  newTask,
  newTaskTitle,
  newTaskCat,
  newTaskDifficulty,
  newTaskTime,
}) {
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

 
  function handleDelete(id) {
    if (tasks.length > 0) {
      setTasks(tasks.filter((task) => task.id !== id).map((task) => task));
      if (clickedTask.id === id) {
        setClickedTask(tasks[id] ? tasks[id] :  "");
      }
    }
  }
  {
    /*
     * ! Edit functions space -----------------------------------------------------------------
     */
  }

   let [editWindow, setEditWindow] = useState(false);
  function handleEditWindow() {
    setEditWindow(!editWindow);
  }

  useEffect(()=>{
   if(createWindow){
    setEditWindow(false)
   }
  },[createWindow])

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
            if(task.timePassed<task.time){
            return { ...task, time: task.time - 1 };
            }else if(task.timePassed===task.time){
            return { ...task, time: task.time - 1 ,timePassed:task.timePassed-1};
            }

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

  /*
   * ! Create functions space -----------------------------------------------------------------
   */

  function handleCreateWindow() {
    setCreateWindow(false);
  }

  function handleTitleCreation(e) {
    setNewTaskTitle(e.target.value);
  }

  function handleCatCreation(e) {
    setNewTaskCat(e.target.value);
  }

  function handleDifficultyCreation(e) {
    setNewTaskDifficulty(e.target.value);
  }

  function handleTimeCreation(sign) {
    if (sign === "plus" && newTaskTime < 24) {
      setNewTaskTime((t) => t + 1);
    } else if (sign === "minus" && newTaskTime > 1) {
      setNewTaskTime((t) => t - 1);
    }
  }

  function handleNewTask() {
    setNewTask({
      id: tasks.length + 1,
      title: newTaskTitle,
      cat: newTaskCat,
      difficulty: newTaskDifficulty,
      time: newTaskTime,
      timePassed: 0,
      completed: false,
    });
  }

  useEffect(() => {
    if (newTask !== null) {
      setTasks(t=>[...t,newTask])
      if(!clickedTask){
        setClickedTask(newTask)
      }
      setNewTask(null);
      setNewTaskTitle(null);
      setNewTaskCat(null);
      setNewTaskDifficulty(null);
      setNewTaskTime(1);
      setCreateWindow(false);

      console.log(newTask);
    }
  }, [newTask]);

  return (
    <>
      <hr />
      <div className={style.container}>
        {/*  main container showing info */}
        <div
          style={{
            display: tasks.length===0?"none" : editWindow ? "none" : createWindow ? "none" : "block",
          }}
          className={style.main}
        >
          <h2>
            TASK WORKSPACE{" "}
            <button
              id="edit"
              onClick={handleEditWindow}
              style={{ cursor: "pointer" }}
            >
              ✏️
            </button>{" "}
            <button
              id="del"
              onClick={() => handleDelete(clickedTask.id)}
              style={{ cursor: "pointer" }}
            >
              🗑️
            </button>{" "}
          </h2>
          <p>Active WorkSpace:</p>
          <b> {clickedTask.title ? clickedTask.title : "Null"}</b>
          <p>Track Session Progress:</p>
          <div className={style.controls}>
            <div className={style.minus} onClick={subtractTimePassed}>
              -
            </div>
            <div className={style.amount}>
              {clickedTask
                ? ` ${clickedTask.timePassed} / ${clickedTask.time}h`
                : "Null"}
            </div>
            <div className={style.plus} onClick={addTimePassed}>
              +
            </div>
          </div>
          <div className={style.timeStatus}>
            <div className={style.time}>
              <p>Category</p>
              <h3>{clickedTask.cat ? clickedTask.cat : "Null"}</h3>
            </div>
            <div className={style.status}>
              <p>Task Status</p>
              <h3>
                {clickedTask.completed
                  ? "Completed"
                  : clickedTask
                    ? "In-Progress"
                    : "Null"}
              </h3>
            </div>
          </div>
        </div>

        {/*  Editing work space--------------------------------------------------------------*/}

        <div
          style={{
            display: editWindow ? "block" : createWindow ? "none" : "none",
          }}
          className={style.main}
        >
          <h2>
            EDIT WORKSPACE{" "}
            <button
              id="edit"
              onClick={handleEditWindow}
              style={{ cursor: "pointer" }}
            >
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
              <select
                value={clickedTask.difficulty}
                onChange={handleDifficultyEdit}
                maxLength="6"
                className={style.difficultyOptions}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/*Create a Task WorkSpace ------------------------------------------------------------------------- */}
        <div
          style={{
            display: editWindow ? "none" : createWindow ? "block" : "none",
          }}
          className={style.main}
        >
          <h2>
            Create a Task{" "}
            <button
              id="edit"
              onClick={handleCreateWindow}
              style={{ cursor: "pointer" }}
            >
              ×
            </button>{" "}
            <button id="del" style={{ opacity: 0 }}>
              🗑️
            </button>{" "}
          </h2>
          <p>Task Title:</p>
          <input type="text" onChange={handleTitleCreation} value={newTaskTitle?newTaskTitle:""}  />
          <p>Estimated Time:</p>
          <div className={style.controls}>
            <div
              className={style.minus}
              onClick={() => handleTimeCreation("minus")}
            >
              -
            </div>
            <div className={style.amount}>{newTaskTime}h</div>
            <div
              className={style.plus}
              onClick={() => handleTimeCreation("plus")}
            >
              +
            </div>
          </div>
          <div className={style.timeStatus}>
            <div className={style.time}>
              <p>Category</p>
              <input type="text" onChange={handleCatCreation} value={newTaskCat?newTaskCat:""} />
            </div>
            <div className={style.status}>
              <p>Difficulty</p>
              <select
                onChange={handleDifficultyCreation}
                className={style.difficultyOptions}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button className={style.createTask} onClick={handleNewTask}>
              Create Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
