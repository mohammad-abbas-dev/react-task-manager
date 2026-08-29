import { useContext, useEffect, useState } from "react";
import style from "./card.module.css";

function Card({ tasks, setTasks,filteredTasks }) {
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

  function handleCheck(id) {
    setTasks(t=>t.map((task) => {
      if (task.id == id) {
        return { ...task, completed:!task.completed };
      } else {
        return task;
      }
    }));
  }

  return (
    <>
      {filteredTasks.map((task) => {
        return (
          <div className={style.card}>
            <div
              className={style.checkBox}
              onClick={() => handleCheck(task.id)}
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
