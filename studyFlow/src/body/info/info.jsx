import style from "./info.module.css";


function Info({tasks,clickedTask}) {


  
  return (
    <>
    <hr />
      <div className={style.container}>

        {/*  main container showing info */}
        <div style={{display:"block"}} className={style.main}>
          <h2>TASK WORKSPACE <button id="edit">✏️</button> <button id="del">🗑️</button> </h2>
          <p>Active WorkSpace:</p>
          <b> {clickedTask.title}</b>
          <p>Track Session Progress:</p>
          <div className={style.controls}>
            
            <div className={style.minus}>-</div>
            <div className={style.amount}>1 / {clickedTask.time}h</div>
            <div className={style.plus}>+</div>
            
          </div>
          <div className={style.timeStatus}>
              <div className={style.time}>
                <p>Allocated Time</p>
                <h3>{clickedTask.time} Hours</h3>
              </div>
              <div className={style.status}>
                <p>Target Status</p>
                <h3>{clickedTask.completed ? "Completed" : "In-Progress"}</h3>
              </div>
          </div>
        </div>

        {/*  Editing work space*/}

         <div style={{display:"none"}} className={style.main}>
          <h2>TASK WORKSPACE <button id="edit">×</button> <button id="del" style={{opacity:0.5}}>🗑️</button> </h2>
          <p>Task Title:</p>
           <input type="text" />
          <p>Session Time:</p>
          <div className={style.controls}> 
            
            <div className={style.minus}>-</div>
            <div className={style.amount}>4h</div>
            <div className={style.plus}>+</div>
            
          </div>
          <div className={style.timeStatus}>
              <div className={style.time}>
                <p>Allocated Time</p>
                <input type="text" />
              </div>
              <div className={style.status}>
                <p>Priority</p>
                <input type="text" />
              </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default Info;
