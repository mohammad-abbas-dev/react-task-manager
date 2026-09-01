import Header from "./header/header.jsx";
import Body from "./body/body.jsx";
import { createContext, useEffect, useState } from "react";
export const totalHoursContext = createContext();

function App() {
  
  let [totalHours, setTotalHours] = useState(0);
 
  let [totalTasks, setTotalTasks] = useState([]);

  let [tasksCompleted, setTasksCompleted] = useState(0);

  return (
    <>
      <totalHoursContext.Provider value={totalHours}>
        <Header tasksCompleted={tasksCompleted} totalTasks={totalTasks} />
      </totalHoursContext.Provider>

      <totalHoursContext.Provider value={setTotalHours}>
        <Body
          setTasksCompleted={setTasksCompleted}
          tasksCompleted={tasksCompleted}
          setTotalTasks={setTotalTasks}
        />
      </totalHoursContext.Provider>
    </>
  );
}

export default App;
