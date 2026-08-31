import { useContext, useEffect, useState } from "react";
import style from "./card.module.css";

function Card({ tasks, setTasks, filteredTasks, setClickedTask, clickedTask }) {
  let [difficultyColor, setDifficultyColor] = useState("lightGreen");
  let [difficultyBg, setDifficultyBg] = useState("var(--easy-bg)");
  function handleDifficultyColors() {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].difficulty === "medium") {
        setDifficultyColor("lightOrange");
        setDifficultyBg("var(--medium-bg)");
      }
      if (tasks[i].difficulty === "hard") {
        setDifficultyColor("lightRed");
        setDifficultyBg("var(--hard-bg)");
      }
    }
  }
  useEffect(handleDifficultyColors);

  function taskClick(id) {
    setClickedTask(filteredTasks.find((task) => task.id === id));
  }

  function handleCheck(id, e) {
    e.stopPropagation();

    {
      /* NOTHING IS AI GENERATED HERE OR ANYWHERE ELSE 
       WHY WE USE e.stopPropagation() :
       what you imagine is: you click the checkbox -> task.completed changes -> tasks will see the change and pass it to filteredTasks -> clickedTask will read it as its relaying on filteredTasks / but the truth is you click the checkBox -> task.completed changes in its object  -> event bubbling happen (taskClick() is called again) and clickedTask is now updated according to filteredTasks which didnt update yet as bubbling happen before the re-render of main tasks which filteredTasks is relaying on thats why we use e.stopPropagation() and change clicked task manually again below in this fn*/
    }

    setTasks((t) =>
      t.map((task) => {
        if (task.id == id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      }),
    );

    if (clickedTask.id === id) {
      setClickedTask((c) => ({ ...c, completed: !clickedTask.completed }));
    }
  }

  return (
    <>
      {filteredTasks.map((task) => {
        return (
          <div
            style={{
              border:
                clickedTask.id === task.id
                  ? "1px solid var(--clicked-task-border)"
                  : "",
              background:
                clickedTask.id === task.id ? "var(--clicked-task)" : "",
            }}
            onClick={() => taskClick(task.id)}
            className={style.card}
            key={task.id}
          >
            <div
              className={style.checkBox}
              onClick={(e) => handleCheck(task.id, e)}
              style={{
                backgroundColor: task.completed ? "green" : "transparent",
              }}
            >
              <span style={{ display: task.completed ? "block" : "none" }}>
                ✓
              </span>
            </div>
            <div className={style.cardText}>
              {" "}
              {/* Title */}
              <h2>{task.title}</h2>
              <div className={style.moreInfo}>
                {" "}
                {/* cat + diff.... */}
                <div className={style.cat}>{task.cat}</div>
                <div
                  className={style.difficulty}
                  style={{
                    color: difficultyColor,
                    backgroundColor: difficultyBg,
                  }}
                >
                  {task.difficulty}
                </div>
              </div>
            </div>
            <div className={style.rightSide}>
              <div className={style.taskTime}>
                {/* study duration */}

                <h3>1/{task.time}h</h3>

                <div className={style.progressBar}>
                  <div className={style.currentProgress}></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Card;
