import style from "./info.module.css";
function Info() {
  return (
    <>
    <hr />
      <div className={style.container}>
        <div className={style.main}>
          <h2>TASK WORKSPACE <button id="edit">✏️</button> <button id="del">🗑️</button> </h2>
          <p>Active WorkSpace:</p>
          <b> Write Some Code</b>
          <p>Track Session Progress:</p>
          <div className={style.controls}>
            
            <div className={style.minus}>-</div>
            <div className={style.amount}>1 / 4h</div>
            <div className={style.plus}>+</div>
            
          </div>
          <div className={style.timeStatus}>
              <div className={style.time}>
                <p>Allocated Time</p>
                <h3>4 Hours</h3>
              </div>
              <div className={style.status}>
                <p>Target Status</p>
                <h3>Completed</h3>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
