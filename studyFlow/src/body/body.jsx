import style from './body.module.css'
import Card from './card/card.jsx'
import Info from './info/info.jsx'
function Body(){

return(
    <>
    
    <div className={style.options}>
    <div className={style.leftSide}>
        <input placeholder='Search Category...' className={style.catSearch} type="text" />
        <div className={style.btns}>
            <button>All</button>
            <button>In-Progress</button>
            <button>Completed</button>
        </div>
    </div>
    <div className={style.rightSide}>
        <button className={style.addTask}>+ Add Task</button>
    </div>
    </div>

    <div className={style.tasks}>
        <Card/>
        <Card/>
       
    </div>
    <Info/>
    </>
)
}

export default Body