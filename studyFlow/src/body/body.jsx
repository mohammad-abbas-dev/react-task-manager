import style from "./body.module.css";
import Card from "./card/card.jsx";
import Info from "./info/info.jsx";
import { useState, useContext, useEffect, createContext } from "react";
import { totalHoursContext } from "../App.jsx";
function Body({ setTasksCompleted, setTotalTasks }) {
  let [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Write Some Code",
      cat: "coding",
      difficulty: "hard",
      time: 2,
      completed: false,
    },
    {
      id: 2,
      title: "Do Chores",
      cat: "daily life",
      difficulty: "medium",
      time: 1,
      completed: true,
    },
  ]);

  let [searchInput, setSearchInput] = useState("");
  let [selectedStatue, setSelectedStatue] = useState("");

  function handleSearch(e) {
    setSearchInput(e.target.value);
  }
  let [filterButtons, setFilterButtons] = useState("all");

  let filteredTasks = [...tasks].filter((task) => {
    if (filterButtons === "all") {
      return task.title.toLowerCase().startsWith(searchInput);
    } else if (filterButtons === "inCompleted") {
      return (
        !task.completed && task.title.toLowerCase().startsWith(searchInput)
      );
    } else if (filterButtons === "completed") {
      return task.completed && task.title.toLowerCase().startsWith(searchInput);
    }
  });

  let setTotalHours = useContext(totalHoursContext);
  let total = 0;

  function handleTotalHours() {
    for (let i = 0; i < tasks.length; i++) {
      total = total + tasks[i].time;
    }
    setTotalHours(total);
  }

  useEffect(() => {
    total = 0;
    handleTotalHours();
  }, [total]);

  function handleStatus() {
    let completed = tasks.filter((task) => task.completed);
    setTasksCompleted(completed.length);
  }

  useEffect(() => {
    handleStatus();
    setTotalTasks(tasks);
  }, [tasks]);

  function handleCatSearch(btnClicked) {
    if (btnClicked === "All") {
      setFilterButtons("all");
    }
    if (btnClicked === "Completed") {
      setFilterButtons("completed");
    }
    if (btnClicked === "In-Progress") {
      setFilterButtons("inCompleted");
    }
  }

    let [clickedTask,setClickedTask] = useState("")
  
 
  return (
    <>
      <div className={style.options}>
        <div className={style.leftSide}>
          <input
            placeholder="Search Title..."
            className={style.catSearch}
            onChange={handleSearch}
            type="text"
          />
          <div className={style.btns}>
            <button
              onClick={() => handleCatSearch("All")}
              style={{ background: filterButtons === "all" ? "#336EF3" : "" }}
            >
              All
            </button>

            <button
              onClick={() => handleCatSearch("In-Progress")}
              style={{
                background: filterButtons === "inCompleted" ? "#336EF3" : "",
              }}
            >
              In-Progress
            </button>

            <button
              onClick={() => handleCatSearch("Completed")}
              style={{
                background: filterButtons === "completed" ? "#336EF3" : "",
              }}
            >
              Completed
            </button>
          </div>
        </div>
        <div className={style.rightSide}>
          <button className={style.addTask}>+ Add Task</button>
        </div>
      </div>

      <div className={style.tasks}>
        <Card
          tasks={tasks}
          setTasks={setTasks}
          filteredTasks={filteredTasks}
          clickedTask={clickedTask}
          setClickedTask={setClickedTask}
        />
      </div>
      <Info tasks={tasks} clickedTask={clickedTask} />
    </>
  );
}

export default Body;
