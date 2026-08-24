import style from "./card.module.css";

function Card() {
  return (
    <>
      <div className={style.card}>
        <div className={style.checkBox}></div>
        <div className={style.cardText}> {/* Title */}

          <h2>Write Some Code</h2>

          <div className={style.moreInfo}> {/* cat + diff.... */}

            <div className={style.cat}>Coding</div>  

            <div className={style.difficulty}>Easy</div>

          </div>
        </div>
        <div className={style.rightSide}>
          <div className={style.taskTime}>{/* study duration */}

            <h3>3/4h</h3>

            <div className={style.progressBar}>
                <div className={style.currentProgress}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
